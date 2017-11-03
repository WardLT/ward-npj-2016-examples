import sys
from classFinder import *

if len(sys.argv) != 2:
	print "Parses documentation to find commands for each kind of commandable object"
	print "Usage: %s <javadoc dir>"%(sys.argv[0])
	sys.exit()
docDir=sys.argv[1]

# Look for all classes
lib=ClassLibrary()
lib.findClasses(docDir)

## Get all extensions of BaseStatistics
stats = lib.getCompleteSubclasses("BaseModel")
print [ x.name for x in stats ]


