#
# This is an example script for accessing a Magpie server
#  from Python. To use it you first need to generate the 
#  Python interface code with Apache Thrift:
#
#    thrift --gen py magpie.thrift
#
#  Then, start a Magpie server with models for predicting
#  the volume and bandgap energy of a material when provided
#  with its composition. There should eventually be a 
#  publically-accessible server running this, so you 
#  eventually won't need this step.
# 
#  Author: Logan Ward
#  Date:   18 Feb 2015
import sys
sys.path.append('gen-py')

from magpie import *
from magpie.ttypes import *

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

try:

  # Make socket
  transport = TSocket.TSocket('localhost', 4581)
  transport = TTransport.TBufferedTransport(transport)
  protocol = TBinaryProtocol.TBinaryProtocol(transport)
  client = MagpieServer.Client(protocol)

  # Connect!
  transport.open()

  # Evaluate properties of NaCl 
  entry = Entry()
  entry.name = "NaCl"
  res = client.evaluateProperties([entry], ["bandgap"])
  entry = res[0]
  print "Predicted bandgap of %s: %s eV"%(entry.name, entry.predictedProperties['bandgap'])

  # Search for materials with a band gap closest to 5.4 eV
  res = client.searchSingleObjective("bandgap minimize TargetEntryRanker 5.4",
	"PhaseDiagramCompositionEntryGenerator 1 2 -crystal 5 Ni Fe O Si F S Cu Au Zn Ge Na Cl",
	10)
  print "Materials with a band gap close to 5.4 eV:"
  for e in res:
	print "\t%s"%e.name

  # Search for materials with a band gap close to 5.4 eV and minimum specific volume
  res = client.searchMultiObjective(10.0,
	["bandgap minimize TargetEntryRanker 5.4", "volume minimize SimpleEntryRanker"],
	"PhaseDiagramCompositionEntryGenerator 1 2 -crystal 5 Ni Fe O Si F S Cu Au Zn Ge Na Cl",
	10)
  print "Materials with a band gap close to 5.4 eV and minimum specific volume:"
  for e in res:
	print "\t%s"%e.name

  # Close!
  transport.close()
except MagpieException, mx:
  print mx
  print '%s' % (mx.why)
except Thrift.TException, tx:
  print '%s' % (tx.message)
