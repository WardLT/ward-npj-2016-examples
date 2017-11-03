import sys
from classFinder import *
from classHTMLRenderer import *

# The purpose this this code is to generate documentation for the
#  text interface of Magpie. It will parse the Javadoc from Magpie
#  to identify all implemented classes. Then, it assembles a website
#  that tells users the name of each class, how to instantiate it,
#  and what commands it can run.
#
# To Do List:
#  - Be able to tell when a command was overloaded
#  - Only crash when a single file is ill-formated
#	= Debatable: Catastrophic failure means documentation would mean that file would be more likely to be fixed
#
# Authors:
#   Logan Ward (ward.logan.t@gmail.com)

if len(sys.argv) != 2:
	print "Write documentation of how to instantiate and use Magpie variables"
	print "Usage: %s <javadoc dir>"%(sys.argv[0])
	sys.exit()
docDir=sys.argv[1]

# Look for all classes
lib=ClassLibrary()
lib.findClasses(docDir, "magpie")

# Define useful functions
def printClassSummary(fp, classes):
	"""
	Generate a quick summary of each class in a list
	
	:param fp Pointer to output file
	:param classes List of classes
	"""
	# Get info
	output = []
	for cls in classes:
		path=HTMLRenderer.pathToDocumentationFile(cls)
		newLine = "<b><a href=\"" + path + "\">" + cls.package + "." + cls.name + "</a></b>"
		if len(cls.usage) > 1:
			newLine += ": Usage: " + cls.usage
		output.append(newLine)
	output.sort()
	
	# Print it
	started = False
	for line in output:
		toPrint = ""
		if not started: started = True
		else: toPrint += "</br>"
		toPrint += line
		print >>fp, toPrint

## Print header
fp = open("variables.html", "w")
print >>fp, "<html>"
print >>fp, "<head>"
print >>fp, "\t<title>Magpie Variable Types</title>"
print >>fp, "\t<link rel=\"stylesheet\" href=\"style.css\" type=\"text/css\" media=\"screen\" />"
print >>fp, "</head>"

## Print introduction
print >>fp, "<body>"
print >>fp, "<div id=\"wrapper\">"
print >>fp, "<div class=\"footer\">"
print >>fp, "\t<center><a href=\"index.html\">Manual Home</a></center>"
print >>fp, "</div>"

print >>fp, "<center><h1>Variable Types</h1></center>"
print >>fp, "<p>Magpie comes equipped with many different kinds of datasets, models, crystal structure prediction algorithms, and other kinds of variables. This section includes all of the currently available variable types and links to pages that describe what operations they&nbsp;support. If you are not yet familiar with how to call these operations, please consult the <a href=\"text-interface.html\">documentation for the text&nbsp;interface</a>.</p>"

## Print dataset classes
print >>fp, "<h2>Datasets</h2>"
print >>fp, "<p>Each of these dataset objects can be used to represent different kinds of data, both in terms of"
print >>fp, " how Magpie represents an entry internally and what kind of attributes it can generate.</p>"

classes = lib.getCompleteSubclasses("Dataset")
printClassSummary(fp, classes)
for cls in classes: 
	HTMLRenderer.writeDocumentationFile(docDir, cls, lib)
	
## Print model classes
print >>fp, "<h2>Models</h2>"
print >>fp, "<p>Magpie is equipped with the ability to generate many different kinds of models. This includes "
print >>fp, "models for classifying data into known subsets or predicting the value of some property.</p>"
classes = lib.getCompleteSubclasses("BaseModel")

print >>fp, "<h3>Classification Models</h3>"
print >>fp, "<p>Classifiers are used decide which group an entry belongs out of a finite list of options.</p>"
subClasses = [ x for x in classes if "classifi" in x.package ]
printClassSummary(fp, subClasses)
for cls in subClasses: 
	HTMLRenderer.writeDocumentationFile(docDir, cls, lib)

print >>fp, "<h3>Regression Models</h3>"
print >>fp, "<p>Regression models are used to approximate unknown, continuous"
print >>fp, " functions (think y = f(x) = a + b * x).</p>"
subClasses = [ x for x in classes if "regression" in x.package ]
printClassSummary(fp, subClasses)
for cls in subClasses: 
	HTMLRenderer.writeDocumentationFile(docDir, cls, lib)


## Print statistics classes
print >>fp, "<h2>Statistics Calculators</h2>"
print >>fp, "<p>Each of these objects can be used calculate different statistics about the performance of a model.</p>"

classes = lib.getCompleteSubclasses("BaseStatistics")
printClassSummary(fp, classes)
for cls in classes: 
	HTMLRenderer.writeDocumentationFile(docDir, cls, lib)

## Print clusterer classes
print >>fp, "<h2>Clusterers</h2>"
print >>fp, "<p>Clustering algorithms perform unsupervised learning, which recognizes "
print >>fp, "groups of data with similar attributes and provides rules for how to distinguish between them. "
print >>fp, "These groups <i>are not</i> known beforehand, use classification algorithms to build rules for "
print >>fp, "separating data into already-known groups.</p>"

classes = lib.getCompleteSubclasses("BaseClusterer")
printClassSummary(fp, classes)
for cls in classes: 
	HTMLRenderer.writeDocumentationFile(docDir, cls, lib)

## Print Optimization Classes
print >>fp, "<h2>Optimizers</h2>"
print >>fp, "<p>Optimization algorithms are designed to quickly locate optimal candidates out of a large space "
print >>fp, "of possibilities.</p>"

classes = lib.getCompleteSubclasses("BaseOptimizer")
printClassSummary(fp, classes)
for cls in classes: 
	HTMLRenderer.writeDocumentationFile(docDir, cls, lib)

	
## Print Optimization Classes
print >>fp, "<h2>Crystal Structure Predictors</h2>"
print >>fp, "<p>Crystal structure prediction algorithms are used to predict which crystal structure "
print >>fp, "is most probable out of a list of known prototypes to be stable at a certain composition.</p>"

classes = lib.getCompleteSubclasses("CSPEngine")
printClassSummary(fp, classes)
for cls in classes: 
	HTMLRenderer.writeDocumentationFile(docDir, cls, lib)

## Close up shop
print >>fp, "</div>\n</body>"
print >>fp, "</html>"
fp.close()

