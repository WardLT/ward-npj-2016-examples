//
// Autogenerated by Thrift Compiler (0.9.2)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


//HELPER FUNCTIONS AND STRUCTURES

MagpieServer_getModelInformation_args = function(args) {
};
MagpieServer_getModelInformation_args.prototype = {};
MagpieServer_getModelInformation_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

MagpieServer_getModelInformation_args.prototype.write = function(output) {
  output.writeStructBegin('MagpieServer_getModelInformation_args');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

MagpieServer_getModelInformation_result = function(args) {
  this.success = null;
  this.ouch = null;
  if (args instanceof MagpieException) {
    this.ouch = args;
    return;
  }
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
    if (args.ouch !== undefined) {
      this.ouch = args.ouch;
    }
  }
};
MagpieServer_getModelInformation_result.prototype = {};
MagpieServer_getModelInformation_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.MAP) {
        var _size48 = 0;
        var _rtmp352;
        this.success = {};
        var _ktype49 = 0;
        var _vtype50 = 0;
        _rtmp352 = input.readMapBegin();
        _ktype49 = _rtmp352.ktype;
        _vtype50 = _rtmp352.vtype;
        _size48 = _rtmp352.size;
        for (var _i53 = 0; _i53 < _size48; ++_i53)
        {
          if (_i53 > 0 ) {
            if (input.rstack.length > input.rpos[input.rpos.length -1] + 1) {
              input.rstack.pop();
            }
          }
          var key54 = null;
          var val55 = null;
          key54 = input.readString().value;
          val55 = new ModelInfo();
          val55.read(input);
          this.success[key54] = val55;
        }
        input.readMapEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ouch = new MagpieException();
        this.ouch.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

MagpieServer_getModelInformation_result.prototype.write = function(output) {
  output.writeStructBegin('MagpieServer_getModelInformation_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.MAP, 0);
    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.STRUCT, Thrift.objectLength(this.success));
    for (var kiter56 in this.success)
    {
      if (this.success.hasOwnProperty(kiter56))
      {
        var viter57 = this.success[kiter56];
        output.writeString(kiter56);
        viter57.write(output);
      }
    }
    output.writeMapEnd();
    output.writeFieldEnd();
  }
  if (this.ouch !== null && this.ouch !== undefined) {
    output.writeFieldBegin('ouch', Thrift.Type.STRUCT, 1);
    this.ouch.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

MagpieServer_evaluateProperties_args = function(args) {
  this.entries = null;
  this.props = null;
  if (args) {
    if (args.entries !== undefined) {
      this.entries = args.entries;
    }
    if (args.props !== undefined) {
      this.props = args.props;
    }
  }
};
MagpieServer_evaluateProperties_args.prototype = {};
MagpieServer_evaluateProperties_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.LIST) {
        var _size58 = 0;
        var _rtmp362;
        this.entries = [];
        var _etype61 = 0;
        _rtmp362 = input.readListBegin();
        _etype61 = _rtmp362.etype;
        _size58 = _rtmp362.size;
        for (var _i63 = 0; _i63 < _size58; ++_i63)
        {
          var elem64 = null;
          elem64 = new Entry();
          elem64.read(input);
          this.entries.push(elem64);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.LIST) {
        var _size65 = 0;
        var _rtmp369;
        this.props = [];
        var _etype68 = 0;
        _rtmp369 = input.readListBegin();
        _etype68 = _rtmp369.etype;
        _size65 = _rtmp369.size;
        for (var _i70 = 0; _i70 < _size65; ++_i70)
        {
          var elem71 = null;
          elem71 = input.readString().value;
          this.props.push(elem71);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

MagpieServer_evaluateProperties_args.prototype.write = function(output) {
  output.writeStructBegin('MagpieServer_evaluateProperties_args');
  if (this.entries !== null && this.entries !== undefined) {
    output.writeFieldBegin('entries', Thrift.Type.LIST, 1);
    output.writeListBegin(Thrift.Type.STRUCT, this.entries.length);
    for (var iter72 in this.entries)
    {
      if (this.entries.hasOwnProperty(iter72))
      {
        iter72 = this.entries[iter72];
        iter72.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.props !== null && this.props !== undefined) {
    output.writeFieldBegin('props', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.STRING, this.props.length);
    for (var iter73 in this.props)
    {
      if (this.props.hasOwnProperty(iter73))
      {
        iter73 = this.props[iter73];
        output.writeString(iter73);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

MagpieServer_evaluateProperties_result = function(args) {
  this.success = null;
  this.ouch = null;
  if (args instanceof MagpieException) {
    this.ouch = args;
    return;
  }
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
    if (args.ouch !== undefined) {
      this.ouch = args.ouch;
    }
  }
};
MagpieServer_evaluateProperties_result.prototype = {};
MagpieServer_evaluateProperties_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        var _size74 = 0;
        var _rtmp378;
        this.success = [];
        var _etype77 = 0;
        _rtmp378 = input.readListBegin();
        _etype77 = _rtmp378.etype;
        _size74 = _rtmp378.size;
        for (var _i79 = 0; _i79 < _size74; ++_i79)
        {
          var elem80 = null;
          elem80 = new Entry();
          elem80.read(input);
          this.success.push(elem80);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ouch = new MagpieException();
        this.ouch.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

MagpieServer_evaluateProperties_result.prototype.write = function(output) {
  output.writeStructBegin('MagpieServer_evaluateProperties_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter81 in this.success)
    {
      if (this.success.hasOwnProperty(iter81))
      {
        iter81 = this.success[iter81];
        iter81.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.ouch !== null && this.ouch !== undefined) {
    output.writeFieldBegin('ouch', Thrift.Type.STRUCT, 1);
    this.ouch.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

MagpieServer_searchSingleObjective_args = function(args) {
  this.obj = null;
  this.genMethod = null;
  this.numToList = null;
  if (args) {
    if (args.obj !== undefined) {
      this.obj = args.obj;
    }
    if (args.genMethod !== undefined) {
      this.genMethod = args.genMethod;
    }
    if (args.numToList !== undefined) {
      this.numToList = args.numToList;
    }
  }
};
MagpieServer_searchSingleObjective_args.prototype = {};
MagpieServer_searchSingleObjective_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.obj = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.genMethod = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.numToList = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

MagpieServer_searchSingleObjective_args.prototype.write = function(output) {
  output.writeStructBegin('MagpieServer_searchSingleObjective_args');
  if (this.obj !== null && this.obj !== undefined) {
    output.writeFieldBegin('obj', Thrift.Type.STRING, 1);
    output.writeString(this.obj);
    output.writeFieldEnd();
  }
  if (this.genMethod !== null && this.genMethod !== undefined) {
    output.writeFieldBegin('genMethod', Thrift.Type.STRING, 2);
    output.writeString(this.genMethod);
    output.writeFieldEnd();
  }
  if (this.numToList !== null && this.numToList !== undefined) {
    output.writeFieldBegin('numToList', Thrift.Type.I32, 3);
    output.writeI32(this.numToList);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

MagpieServer_searchSingleObjective_result = function(args) {
  this.success = null;
  this.ouch = null;
  if (args instanceof MagpieException) {
    this.ouch = args;
    return;
  }
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
    if (args.ouch !== undefined) {
      this.ouch = args.ouch;
    }
  }
};
MagpieServer_searchSingleObjective_result.prototype = {};
MagpieServer_searchSingleObjective_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        var _size82 = 0;
        var _rtmp386;
        this.success = [];
        var _etype85 = 0;
        _rtmp386 = input.readListBegin();
        _etype85 = _rtmp386.etype;
        _size82 = _rtmp386.size;
        for (var _i87 = 0; _i87 < _size82; ++_i87)
        {
          var elem88 = null;
          elem88 = new Entry();
          elem88.read(input);
          this.success.push(elem88);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ouch = new MagpieException();
        this.ouch.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

MagpieServer_searchSingleObjective_result.prototype.write = function(output) {
  output.writeStructBegin('MagpieServer_searchSingleObjective_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter89 in this.success)
    {
      if (this.success.hasOwnProperty(iter89))
      {
        iter89 = this.success[iter89];
        iter89.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.ouch !== null && this.ouch !== undefined) {
    output.writeFieldBegin('ouch', Thrift.Type.STRUCT, 1);
    this.ouch.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

MagpieServer_searchMultiObjective_args = function(args) {
  this.p = null;
  this.objs = null;
  this.genMethod = null;
  this.numToList = null;
  if (args) {
    if (args.p !== undefined) {
      this.p = args.p;
    }
    if (args.objs !== undefined) {
      this.objs = args.objs;
    }
    if (args.genMethod !== undefined) {
      this.genMethod = args.genMethod;
    }
    if (args.numToList !== undefined) {
      this.numToList = args.numToList;
    }
  }
};
MagpieServer_searchMultiObjective_args.prototype = {};
MagpieServer_searchMultiObjective_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.DOUBLE) {
        this.p = input.readDouble().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.LIST) {
        var _size90 = 0;
        var _rtmp394;
        this.objs = [];
        var _etype93 = 0;
        _rtmp394 = input.readListBegin();
        _etype93 = _rtmp394.etype;
        _size90 = _rtmp394.size;
        for (var _i95 = 0; _i95 < _size90; ++_i95)
        {
          var elem96 = null;
          elem96 = input.readString().value;
          this.objs.push(elem96);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.genMethod = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I32) {
        this.numToList = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

MagpieServer_searchMultiObjective_args.prototype.write = function(output) {
  output.writeStructBegin('MagpieServer_searchMultiObjective_args');
  if (this.p !== null && this.p !== undefined) {
    output.writeFieldBegin('p', Thrift.Type.DOUBLE, 1);
    output.writeDouble(this.p);
    output.writeFieldEnd();
  }
  if (this.objs !== null && this.objs !== undefined) {
    output.writeFieldBegin('objs', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.STRING, this.objs.length);
    for (var iter97 in this.objs)
    {
      if (this.objs.hasOwnProperty(iter97))
      {
        iter97 = this.objs[iter97];
        output.writeString(iter97);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.genMethod !== null && this.genMethod !== undefined) {
    output.writeFieldBegin('genMethod', Thrift.Type.STRING, 3);
    output.writeString(this.genMethod);
    output.writeFieldEnd();
  }
  if (this.numToList !== null && this.numToList !== undefined) {
    output.writeFieldBegin('numToList', Thrift.Type.I32, 4);
    output.writeI32(this.numToList);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

MagpieServer_searchMultiObjective_result = function(args) {
  this.success = null;
  this.ouch = null;
  if (args instanceof MagpieException) {
    this.ouch = args;
    return;
  }
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
    if (args.ouch !== undefined) {
      this.ouch = args.ouch;
    }
  }
};
MagpieServer_searchMultiObjective_result.prototype = {};
MagpieServer_searchMultiObjective_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        var _size98 = 0;
        var _rtmp3102;
        this.success = [];
        var _etype101 = 0;
        _rtmp3102 = input.readListBegin();
        _etype101 = _rtmp3102.etype;
        _size98 = _rtmp3102.size;
        for (var _i103 = 0; _i103 < _size98; ++_i103)
        {
          var elem104 = null;
          elem104 = new Entry();
          elem104.read(input);
          this.success.push(elem104);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ouch = new MagpieException();
        this.ouch.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

MagpieServer_searchMultiObjective_result.prototype.write = function(output) {
  output.writeStructBegin('MagpieServer_searchMultiObjective_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter105 in this.success)
    {
      if (this.success.hasOwnProperty(iter105))
      {
        iter105 = this.success[iter105];
        iter105.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.ouch !== null && this.ouch !== undefined) {
    output.writeFieldBegin('ouch', Thrift.Type.STRUCT, 1);
    this.ouch.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

MagpieServerClient = function(input, output) {
    this.input = input;
    this.output = (!output) ? input : output;
    this.seqid = 0;
};
MagpieServerClient.prototype = {};
MagpieServerClient.prototype.getModelInformation = function(callback) {
  this.send_getModelInformation(callback); 
  if (!callback) {
    return this.recv_getModelInformation();
  }
};

MagpieServerClient.prototype.send_getModelInformation = function(callback) {
  this.output.writeMessageBegin('getModelInformation', Thrift.MessageType.CALL, this.seqid);
  var args = new MagpieServer_getModelInformation_args();
  args.write(this.output);
  this.output.writeMessageEnd();
  if (callback) {
    var self = this;
    this.output.getTransport().flush(true, function() {
      var result = null;
      try {
        result = self.recv_getModelInformation();
      } catch (e) {
        result = e;
      }
      callback(result);
    });
  } else {
    return this.output.getTransport().flush();
  }
};

MagpieServerClient.prototype.recv_getModelInformation = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new MagpieServer_getModelInformation_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.ouch) {
    throw result.ouch;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'getModelInformation failed: unknown result';
};
MagpieServerClient.prototype.evaluateProperties = function(entries, props, callback) {
  this.send_evaluateProperties(entries, props, callback); 
  if (!callback) {
    return this.recv_evaluateProperties();
  }
};

MagpieServerClient.prototype.send_evaluateProperties = function(entries, props, callback) {
  this.output.writeMessageBegin('evaluateProperties', Thrift.MessageType.CALL, this.seqid);
  var args = new MagpieServer_evaluateProperties_args();
  args.entries = entries;
  args.props = props;
  args.write(this.output);
  this.output.writeMessageEnd();
  if (callback) {
    var self = this;
    this.output.getTransport().flush(true, function() {
      var result = null;
      try {
        result = self.recv_evaluateProperties();
      } catch (e) {
        result = e;
      }
      callback(result);
    });
  } else {
    return this.output.getTransport().flush();
  }
};

MagpieServerClient.prototype.recv_evaluateProperties = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new MagpieServer_evaluateProperties_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.ouch) {
    throw result.ouch;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'evaluateProperties failed: unknown result';
};
MagpieServerClient.prototype.searchSingleObjective = function(obj, genMethod, numToList, callback) {
  this.send_searchSingleObjective(obj, genMethod, numToList, callback); 
  if (!callback) {
    return this.recv_searchSingleObjective();
  }
};

MagpieServerClient.prototype.send_searchSingleObjective = function(obj, genMethod, numToList, callback) {
  this.output.writeMessageBegin('searchSingleObjective', Thrift.MessageType.CALL, this.seqid);
  var args = new MagpieServer_searchSingleObjective_args();
  args.obj = obj;
  args.genMethod = genMethod;
  args.numToList = numToList;
  args.write(this.output);
  this.output.writeMessageEnd();
  if (callback) {
    var self = this;
    this.output.getTransport().flush(true, function() {
      var result = null;
      try {
        result = self.recv_searchSingleObjective();
      } catch (e) {
        result = e;
      }
      callback(result);
    });
  } else {
    return this.output.getTransport().flush();
  }
};

MagpieServerClient.prototype.recv_searchSingleObjective = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new MagpieServer_searchSingleObjective_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.ouch) {
    throw result.ouch;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'searchSingleObjective failed: unknown result';
};
MagpieServerClient.prototype.searchMultiObjective = function(p, objs, genMethod, numToList, callback) {
  this.send_searchMultiObjective(p, objs, genMethod, numToList, callback); 
  if (!callback) {
    return this.recv_searchMultiObjective();
  }
};

MagpieServerClient.prototype.send_searchMultiObjective = function(p, objs, genMethod, numToList, callback) {
  this.output.writeMessageBegin('searchMultiObjective', Thrift.MessageType.CALL, this.seqid);
  var args = new MagpieServer_searchMultiObjective_args();
  args.p = p;
  args.objs = objs;
  args.genMethod = genMethod;
  args.numToList = numToList;
  args.write(this.output);
  this.output.writeMessageEnd();
  if (callback) {
    var self = this;
    this.output.getTransport().flush(true, function() {
      var result = null;
      try {
        result = self.recv_searchMultiObjective();
      } catch (e) {
        result = e;
      }
      callback(result);
    });
  } else {
    return this.output.getTransport().flush();
  }
};

MagpieServerClient.prototype.recv_searchMultiObjective = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new MagpieServer_searchMultiObjective_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.ouch) {
    throw result.ouch;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'searchMultiObjective failed: unknown result';
};
