# This file contains operations designed to store information 
#  about Java classes found in an HTML javadoc

import os
import sys
import re

"""
Parses HTML Javadoc and stores information about all discovered classes.
"""
class ClassLibrary:
        """ Name of the package """
        _packageName = ""
	""" All classes that have been found """
	_knownClasses = []
	""" Path from cwd to package directory """
	_docPath = ""
	
	def findClasses(self, docDir, packageName):
		"""
		Locate all classes in a directory of Javadoc. 
		:param docDir Javadoc directory 
		:param packageName Name of package to document (probably magpie)
		"""
		## Find all classes
		self._docPath = docDir;
		self._packageName= packageName
		classes = self._recursiveSearch(docDir + "/" + packageName)
		## Remove _docPath from path names
		classes = [ x[len(self._docPath):] for x in classes ]
		## Store class info
		self._knownClasses = set([ self._getClassInfo(x) for x in classes ])
		
	def getSubclasses(self, ClassName):
		"""
		Finds all subclasses of a certain class
		:param ClassName Name of that class
		:return Lists of all classes that are a subclass of that class
		"""
		output = [ x for x in self._knownClasses if x.extends == ClassName ]
		# Recursively search
		for x in output:
			output.extend(self.getSubclasses(x.name))
		return list(set(output))
		
	def getCompleteSubclasses(self, ClassName):
		"""
		Find all non-abstract subclasses of a certain class
		:param ClassName Name of that class
		:return Lists of all classes that are a subclass of that class and not abstract
		"""
		classes = self.getSubclasses(ClassName)
		baseClass = self.getClass(ClassName)
		classes.append(baseClass)
		return [ x for x in classes if not x.abstract ]
		
	def getClass(self, name):
		"""
		Retrieve a class by name. 
		:return Class if found. None if not
		"""
		for cls in self._knownClasses:
			if cls.name == name: return cls
		return None

	def _recursiveSearch(self, rootDir):
		"""
		Recursively search for all classes above a certain directory
		:param rootDir Where to start
		:return All classes in directories above rootDir
		"""
		contents = os.listdir(rootDir)
		# Remove fluff from the javadoc generator
		contents = [ x for x in contents if not "package-" in x ]
		if "class-use" in contents: contents.remove("class-use")
		if "constant-values" in contents: contents.remove("constant-values")
		# Append directory name to all contents
		contents = [ os.path.normpath(rootDir + "/" + x) for x in contents ]
		# Find all classes in this directory
		classes = [ x for x in contents if os.path.isfile(x) and "html" in x ]
		# Find all packages in this directory
		packages = [ x for x in contents if os.path.isdir(x) ]
		# Find all classes in lower packages
		for p in packages:
			toAdd = self._recursiveSearch(p)
			classes.extend(toAdd)
		return classes
		
	def _getClassInfo(self, path):
		"""
		Get information about class (i.e. is abstract, superclasses)
		:param path Path to HTML javadoc
		:returns ClassInfo object describing this class
		"""
		fp = open(self._docPath + "/" + path, "r")
		contents = [x for x in fp]
		fp.close()
		return ClassInfo(path, contents, self._packageName)

"""
Holds information about a single Java class. Also has ability to parse HTML javadoc files
"""		
class ClassInfo: 
	"""Name of this class"""
	name = ""
	"""Package of this class"""
	package = ""
	"""Whether class is abstract"""
	abstract = False
	"""Whether class is an interface"""
	interface = False
	"""What class this extends"""
	extends = ""
	"""Operations that this object can perform"""
	operations = []
	"""Usage for this class (how to create it)"""
	usage = ""
	"""Parameters for the usage"""
	usageParameters = []
	"""Print commands for this class"""
	printCommands = []
	"""Formats in which this class can be saved"""
	saveFormats = []
	
	def printInfo(self):
		"""
		Print a simple message about this class
		"""
		if len(self.package) > 0: output = self.package + "."
		else: output = ""
		output += self.name + ": "
		if self.abstract: output += "Abstract, "
		output += self.extends
		return output
		
	def __eq__(self, other):
		if self.package != other.package: return False
		return self.name == other.name
	
	def __hash__(self):
		return hash(self.package) + hash(self.name)
	
	def __init__(self, path, contents, packageName):
		"""
		Instantiate this object by reading in HTML javadoc
		:param path Path to the Javadoc file
		:param contents Contents of Javadoc file
		:param packageName (name of base package probably Magpie)
		"""
		# Get the class names
		path = os.path.relpath(path)
		rest, name = os.path.split(path)
		self.name, ext = os.path.splitext(name)
		# Get the package name
		if len(rest) > 0: rest, package = os.path.split(rest)
		else: package = ""
		while len(rest) > 0:
			rest, temp = os.path.split(rest)
			if packageName in temp: break
			package = temp + "." + package
		self.package = package
		# Get details about this class
		self._getDetails(contents)
	
	def _getDetails(self, contents):
		"""
		Extract details about a class based on its documentation
		:param contents Contents of HTML file
		"""
		## Go to the class description block
		ind = 0
		while ind < len(contents) and not "<div class=\"description\">" in contents[ind]: ind = ind + 1
		if ind == len(contents):
			print "ERROR: missing <div class=\"description\"> in " + self.package + self.name
			sys.exit(1)
		## Loop until we found the first <pre> block (contains class name)
		while not "<pre>" in contents[ind] and ind < len(contents): ind += 1
		if ind == len(contents):
			print "ERROR: Did not find <pre> block when parsing javadoc file"
			sys.exit(1)
		# Determine whether class is abstract
		self.abstract = "abstract" in contents[ind]
		# Get the superclass
		self._getSuperclass(contents, ind)
		# Find the commands
		self._getCommands(contents)
		
	def _getSuperclass(self, contents, ind):
		"""
		Determine Superclass of this class
		:param contents Text of HTML javadoc page
		:param ind Index of beginning of class definition block
		"""
		if not "extend" in contents[ind + 1]:
			# This is an interface
			self.abstract = True;
			self.interface = True;
			self.extends = ""
			return -1;
		temp = "".join(contents[ind+1].split(" ")[1:])
		temp = re.sub("^<a[^>]*>","",temp)
		temp = re.sub("<.*$","",temp)
		if "java.lang.Object" in temp: self.extends = ""
		else: self.extends = temp.strip()
	
	def _getCommands(self, contents):
		"""
		Find all commands available to this object
		:param contents Contents of Javadoc file
		"""
		## Go to the class description block
		ind = 0
		while ind < len(contents) and not "<div class=\"description\">" in contents[ind]: ind = ind + 1
		if ind == len(contents):
			print "ERROR: missing <div class=\"description\"> in " + self.name
			sys.exit(1)
		## Get the usage
		temp = self._getOperations("usage", contents, ind)
		if len(temp) > 0:
			self.usage = temp[0].description
			self.usageParameters = temp[0].parameters
		else:
			self.usage = "*No options*"
			self.usageParameters = []
			
		## Look for operations
		self.operations = set(self._getOperations("command", contents, ind))
		
		## Look for print commands
		self.printCommands = set(self._getOperations("print", contents, ind))
		
		## Look for save formats
		self.saveFormats = set(self._getOperations("save", contents, ind))
		
	def _getOperations(self, cmdType, contents, start):
		"""
		Get all operations of a certain type for this class
		
		:param Type of command (name of HTML flag)
		:param contents Contents of HTML javadoc file
		:param start line at which to start looking
		"""
		ind = start
		commandsText = self._locateCommands(cmdType,contents,start)
		commands = self._parseCommands(commandsText)
		return commands
				
	def _locateCommands(self, tag, contents, start):
		"""
		Given the tag surrounding a type of command (i.e. "usage"), locate all of the text associated with it
		:param tag Name of HTML tag associated with the desired kind of flag (i.e. "usage", not "<usage>")
		:param contents Contents of file being parse
		:param start Where to start scanning
		:return A containing each line of text associated with each instance of a command ("<br>" will mark ends of line)
		"""
		output = []
		ind = start
		startTag = "<" + tag + ">"
		endTag = "</" + tag + ">"
		# Loop until end of file
		while ind < len(contents):
			if startTag in contents[ind]: 
				# Found a new command!
				currentLine = ""
				command = []
				# Loop until end tag is found, adding text to command description at each point
				while True:
					if ind == len(contents):
						print "ERROR: End of file reached while parsing " + self.name
						sys.exit(1)
					# If a line break is found. Append anything before the line break to currentLine,
					#  add currentLine to command, and start a new lines
					if "<br>" in contents[ind]:
						temp = contents[ind].split("<br>")
						currentLine += temp[0]
						command.append(currentLine.strip())
						for i in range(1,len(temp)-1):
							command.append(temp[i].strip())
						currentLine = temp[len(temp)-1].strip()
					else:
						# Otherwise, just append this line to the previous
						currentLine += " " + contents[ind].strip()
					# If the endTag is found, add in currentLine and break
					if endTag in contents[ind]: 
						currentLine = re.sub(endTag,"",currentLine)
						command.append(currentLine.strip())
						break
					# Move to the next line
					ind = ind + 1
				# Now that all text from that command is parsed, store it
				output.append(command)
			# Increment until a command is found
			ind = ind + 1
		# Return the command
		return output
	
	def _removeHTML(self,line):
		return re.sub("<[^>]*>","",line)
	
	def _parseCommands(self,commandText):
		"""
		Turn a list of lines into a ClassCommand object. Expected format
			Line #1: <b>command usage</b> - Command description
			Line #2-?: <pr><i>parameter</i>: Parameter description
			Line #?-End: Optional exposition about how command works
		
		:param commandText Text for each commnad
		:return List of ClassCommands objects representing each command
		"""
		output = []
		usageRegex = re.compile("^.*<b>(.*)<\/b>[\s]*[-:][\s]*(\S.*)$", re.IGNORECASE)
		prRegex = re.compile("^[^:]*<i>(.*)</i>:?\s*(.*)$", re.IGNORECASE)
		for command in commandText:
			# Get the command usage/description
			r = usageRegex.search(command[0])
			if not r:
				print "ERROR: Ill-formed command usage in " + self.name + " : " + command[0]
				print command[0]
				sys.exit(1)
			usage = self._removeHTML(r.group(1))
			if len(r.groups()) > 1: desc = self._removeHTML(r.group(2))
			newCmd = ClassCommand(usage,desc)
			# Add the remaining lines as parameters or details
			for line in command[1:]:
				if "<pr>" in line:
					r = prRegex.search(line)
					if not r:
						print "ERROR: Ill-formed parameter in " + self.name + " : " + usage
						print line
						sys.exit(1)
					name = self._removeHTML(r.group(1))
					desc = self._removeHTML(r.group(2))
					prm = ClassCommandParameter(name, desc)
					newCmd.parameters.append(prm)
				else:
					newCmd.details += " " + line
			output.append(newCmd)
		return output
	
"""
Stores commands (operations, printing, and saving) available for a class
"""
class ClassCommand:
	"""Usage of command"""
	usage = ""
	"""Short description of command"""
	description = ""
	"""Parameters of command"""
	parameters = []
	"""Details about this command"""
	details = ""
	
	def __init__(self, usage, description):
		self.usage = usage
		self.description = description
		self.parameters = []
		self.details = ""
		
	def __eq__(self, other):
		return self.usage == other.usage
		
	def __hash__(self): return hash(self.usage)
		
	def printInfo(self):
		 output = self.usage + " - " + self.description
		 for prm in self.parameters:
		 	output += "\n\t" + prm.printInfo()
		 if len(self.details) > 0:
		 	output += "\n\t" + self.details
		 return output
	
"""
Parameter for a class command
"""
class ClassCommandParameter: 
	"""Name of parameter"""
	name = ""
	"""Description of parameter"""
	description = ""
	
	def __init__(self, name, description):
		self.name = name.strip()
		self.description = description.strip()
	
	def printInfo(self):
		return self.name + " : " + self.description
