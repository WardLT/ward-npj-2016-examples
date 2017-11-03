import os
"""
This class holds operations that generate HTML documentation for Magpie classes.
"""

class HTMLRenderer:
	@staticmethod
	def pathToDocumentationFile(cls, mkdir=False):
		"""
		Given a class name, determine its path (package/ClassName.html)

		:param cls ClassInfo object for desired class
		:param mkdir Make directories required to open file at this path. Starts from chdir
		:return path to its documentation file
		"""
		dirs = cls.package.split(".")
		path = "./classes/"
		for d in dirs: path += d + "/"
		if mkdir and not os.path.isdir(path): os.makedirs(path)
		return path + cls.name + ".html"
		
	@staticmethod 
	def printOperations(fp, operations):
		toOutput = []
		for op in operations:
			newLine = "<p>\n<b>" + op.usage + "</b> &ndash; " + op.description
			for prm in op.parameters:
				newLine += "\n<br><i>" + prm.name + "</i>: " + prm.description
			if len(op.details) > 1: newLine += "\n<br>" + op.details
			newLine += "\n</p>"
			toOutput.append(newLine)
		toOutput.sort()
		for line in toOutput: print >>fp, line
	
	@staticmethod	
	def writeDocumentationFile(jdPath, cls, library):
		"""
		Write a file for the documentation of a single Javadoc
	
		:param jdPath Path to the Javadoc of the Magpie library
		:param cls ClassInfo object for class in question
		:param library Library of all other classes in Magpie
		:return Path to this file
		"""
		## Open output file
		path = HTMLRenderer.pathToDocumentationFile(cls, True)
		fp = open(path, 'w')
	
		## Write header
		print >>fp, "<html>\n<head>"
		print >>fp, "\t<title>" + cls.name + "</title>"
		print >>fp, "</head>"
		print >>fp, "<body>"
		print >>fp, "\t<h1>" + cls.name + "</h1>"
	
		## Write introduction to class
		toJDClass = "../"
		for i in range(cls.package.count(".") + 1): toJDClass += "../"
		toJDClass = toJDClass + jdPath + "/" + library._packageName + "/";
		for package in cls.package.split("."): toJDClass += package + "/";
		toJDClass += cls.name + ".html"
		toJDClass = os.path.relpath(toJDClass)
		print >>fp, "\t<p>See <a href=\"" + toJDClass + "\">Javadoc</a> for complete documentation of this class.</p>"
	
		## Write usage for class
		print >>fp, "<p>\n<b>Usage</b>: " + cls.usage
		for prm in cls.usageParameters:
			print >>fp, "<br><i>" + prm.name + "</i>: " + prm.description
		print >>fp, "</p>"
	
		## Gather operations
		operations = set(cls.operations)
		extends = cls.extends
		while len(extends) > 0:
			superCls = library.getClass(extends)
			operations.update(superCls.operations)
			extends = superCls.extends
	
		## Print out operations
		print >>fp, "<h2>Available Operations</h2>"
		print >>fp, "<p>These commands can be used to perform a variety of tasks, ranging from defining important"
		print >>fp, "settings about the object to actually using it.</p>"
		HTMLRenderer.printOperations(fp, operations)
	
		## Gather/Print print commands
		operations = set(cls.printCommands)
		extends = cls.extends
		while len(extends) > 0:
			superCls = library.getClass(extends)
			operations.update(superCls.printCommands)
			extends = superCls.extends
		if len(operations) > 0:
			print >>fp, "<h2>Available Print Commands</h2>"
			print >>fp, "<p>These commands are run by calling &quot;print &lt;variable name&gt; "
			print >>fp, "&lt;command> [&lt;options>]&quot;. Any output from that command will be "
			print >>fp, "printed to standard output.</p>"
			HTMLRenderer.printOperations(fp, operations)
	
		## Gather/Print save formats
		operations = set(cls.saveFormats)
		extends = cls.extends
		while len(extends) > 0:
			superCls = library.getClass(extends)
			operations.update(superCls.saveFormats)
			extends = superCls.extends
		if len(operations) > 0:
			print >>fp, "<h2>Available Save Formats</h2>"
			print >>fp, "<p>Variables of this type can be saved in the following formats:</p>"
			HTMLRenderer.printOperations(fp, operations)
		
		## Close shop
		print >>fp, "</body>\n</html>"
		fp.close()
