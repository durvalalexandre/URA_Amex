var routeFeature_version = "8.1.3";
/**
 ***********************************************
 * RouteFeature.js
 * For routing utility functions
 * Note: Do not put any comments as the starting line
 ***********************************************
 */

/**
 * This function gets the call type _genesys.ixn.interactions[].voice.type for
 * the specified interaction. If ixnID is not specified, the current interaction ID will
 * be used. If the interaction's call type cannot be determined or the
 * specified ixnID does not exist, the function will return <code>undefined<code>.
 * 
 * @param ixnID
 *            (Optional)The interaction ID.
 */
function getCallType(ixnID) {
	// If the ixnID is given, get the CallType for the given interaction.
	if (typeof ixnID != 'undefined' && ixnID != null) {
		if ( typeof _genesys.ixn.interactions[ixnID].voice != 'undefined') {
			return _genesys.ixn.interactions[ixnID].voice.type;
		}
	}
	// If ixnID is undefined, get the CallType for the current interaction.
	if ( typeof _genesys.ixn.interactions[_event.data.interactionid] != 'undefined' ) {
		if ( typeof _genesys.ixn.interactions[_event.data.interactionid].voice == 'undefined') {
			return _genesys.ixn.interactions[_event.data.interactionid].voice.type;
		}
	}
	// No CallType.
	return undefined;
}


/**
 * This function gets the correct _genesys.FMName.MediaType ENUM for the
 * specified ixnID. If ixnID is not specified, the current interaction ID will
 * be used. If the interaction's media type cannot be determined or the
 * specified ixnID does not exist, the function will return <code>undefined<code>.
 * 
 * @param ixnID
 *            (Optional)The interaction ID.
 */
function getIxnMediaType(ixnID) {
	// If the ixnID is given, get the MediaType for the given interaction.
	if (typeof ixnID != 'undefined' && ixnID != null) {
		if ( typeof _genesys.ixn.interactions[ixnID].voice != 'undefined') {
			return _genesys.ixn.interactions[ixnID].voice.media;
		}
	}
	
	// If ixnID is undefined, get the MediaType for the current interaction.
	if ( typeof _genesys.ixn.interactions[_event.data.interactionid] != 'undefined' ) {
		if ( typeof _genesys.ixn.interactions[_event.data.interactionid].media == 'undefined') {
			return _genesys.ixn.interactions[_event.data.interactionid].voice.media;
		}
	}
	// No MediaType.
	return undefined;
}

/**
 * usecapcond enumeration used in UseCapacity_1 Function Mapping
 */
function toEnumUseCapCond(useCapEnum)
{
	var returnResult = _genesys.queue.usecapcond.Never;
	
	if(useCapEnum!=null){
		if(useCapEnum == "Only"){
			return _genesys.queue.usecapcond.Only;
		}
		else if(useCapEnum == "OnStatError"){
			return _genesys.queue.usecapcond.OnStatError;
		}
	}
	return returnResult;
}

/**
 * Wrapper Function for IRDs Router Function
 */
function irdRouter(name)
{
	var returnResult = undefined;
	
	if(name!=null){
		if(name == "APPLICATION_NAME"){
			return _genesys.session.server.name;
		}
		else {
			return _genesys.session.server.cluster;
		}
	}
	return returnResult;
}

/**
 * Wrapper Function for IRDs SetDNISOverride Function
 */
function irdSetDNISOverride(param)
{
	var returnResult = undefined;
	
	if(param!=null){
		if(param == "UseANI"){
			return _genesys.queue.overwriteType.UseANI;
		}
		else if(param == "UseConfig"){
			return _genesys.queue.overwriteType.UseConfig;
		}
		else if(param == "UseDNIS"){
			return _genesys.queue.overwriteType.UseDNIS;
		}
		else if(param == "UseNone"){
			return _genesys.queue.overwriteType.UseNone;
		}
	}
	return returnResult;
}

/**
 * Wrapper Function for IRDs SetDNISOverride Function
 */
function irdSetTranslationOverride(param)
{
	var returnResult = undefined;
	
	if(param!=null){
		if(param == "UseANI"){
			return _genesys.voice.overwriteType.UseANI;
		}
		else if(param == "UseConfig"){
			return _genesys.voice.overwriteType.UseConfig;
		}
		else if(param == "UseDNIS"){
			return _genesys.voice.overwriteType.UseDNIS;
		}
		else if(param == "UseNone"){
			return _genesys.voice.overwriteType.UseNone;
		}
	}
	return returnResult;
}

function getRouteTypeEnum(type)
{
	var returnResult = undefined;
	
	if(type!=null){
		if(type == "RouteTypeAnnouncement"){
			return _genesys.queue.rType.RouteTypeAnnouncement;
		}
		else if(type == "RouteTypeDDD"){
			return _genesys.queue.rType.RouteTypeDDD;
		}
		else if(type == "RouteTypeDefault"){
			return _genesys.queue.rType.RouteTypeDefault;
		}
		else if(type == "RouteTypeDirect"){
			return _genesys.queue.rType.RouteTypeDirect;
		}
		else if(type == "RouteTypeDirectAgent"){
			return _genesys.queue.rType.RouteTypeDirectAgent;
		}
		else if(type == "RouteTypeGetFromDN"){
			return _genesys.queue.rType.RouteTypeGetFromDN;
		}
		else if(type == "RouteTypeIDDD"){
			return _genesys.queue.rType.RouteTypeIDDD;
		}
		else if(type == "RouteTypeLabel"){
			return _genesys.queue.rType.RouteTypeLabel;
		}
		else if(type == "RouteTypeOverwriteDNIS"){
			return _genesys.queue.rType.RouteTypeOverwriteDNIS;
		}
		else if(type == "RouteTypePostFeature"){
			return _genesys.queue.rType.RouteTypePostFeature;
		}
		else if(type == "RouteTypeReject"){
			return _genesys.queue.rType.RouteTypeReject;
		}
		else if(type == "RouteTypeUnknown"){
			return _genesys.queue.rType.RouteTypeUnknown;
		}
	}
	return returnResult;
}

/**
 * getTargetType utility Function for IRDs UseCustomAgentType Function
 */
function getTargetType(param)
{
	var returnResult = "Place";
	
	if(param!=null){
		if(param == "Agent"){
			return "Agent";
		}
		else if(param == "DN"){
			return "DN";
		}
	}
	return returnResult;
}


/**
 * getDNTypeEnum utility Function for IRDs UseCustomAgentType Function
 */
function getDNTypeEnum(param)
{
	if(param!=null){
		if(param == "any"){
			return _genesys.resource.resourceType.any;
		}
		else if(param == "CFGACDPosition"){
			return _genesys.resource.resourceType.CFGACDPosition;
		}
		else if(param == "CFGACDPosition"){
			return _genesys.resource.resourceType.CFGACDPosition;
		}
		else if(param == "CFGCellular"){
			return _genesys.resource.resourceType.CFGCellular;
		}
		else if(param == "CFGChat"){
			return _genesys.resource.resourceType.CFGChat;
		}
		else if(param == "CFGCoBrowse"){
			return _genesys.resource.resourceType.CFGCoBrowse;
		}
		else if(param == "CFGEmail"){
			return _genesys.resource.resourceType.CFGEmail;
		}
		else if(param == "CFGExtension"){
			return _genesys.resource.resourceType.CFGExtension;
		}
		else if(param == "CFGFAX"){
			return _genesys.resource.resourceType.CFGFAX;
		}
		else if(param == "CFGVideo"){
			return _genesys.resource.resourceType.CFGVideo;
		}
		else if(param == "CFGVoiceMail"){
			return _genesys.resource.resourceType.CFGVoiceMail;
		}
		else if(param == "CFGVoIP"){
			return _genesys.resource.resourceType.CFGVoIP;
		}
		else if(param == "CFGWorkflow"){
			return _genesys.resource.resourceType.CFGWorkflow;
		}
	}
	return param;
}

/**
* IRDs getConfigOption() LookUp Sequence Enum
*/
function getLookUpSeqEnum(param)
{
	if(param!=null){
		if(param == "StartFromCDN"){
			return _genesys.session.lookupseq.StartFromCDN;
		}
		else if(param == "StartFromRouter"){
			return _genesys.session.lookupseq.StartFromRouter;
		}
		else if(param == "StartFromStrategy"){
			return _genesys.session.lookupseq.StartFromStrategy;
		}
		else if(param == "StartFromTenant"){
			return _genesys.session.lookupseq.StartFromTenant;
		}
		else if(param == "StartFromTserver"){
			return _genesys.session.lookupseq.StartFromTserver;
		}
	}
	return param;
}


/**
* IRDs SetCallOption Option param Enum
*/
function getSetOptionsParamEnum(param)
{
	var returnResult = undefined;

	if(param!=null){
		if(param == "StartFromCDN"){
			return _genesys.session.lookupseq.StartFromCDN;
		}
	}
	return returnResult;
}

/**
* IRDs getSDataMethodObject 
*/
function irdCallEntered(param1,param2)
{
	if(param1!=null){
		if(param1 == "Router"){
			return _genesys.statistic.sData("R","CallsEntered");
		}
		else if(param1 == "RoutingPoint"){
			return _genesys.statistic.sData("RP","CallsEntered");
		}
		else if(param1 == "VirtualQueue"){
			return _genesys.statistic.sData(param2,"CallsEntered");
		}
	}
	return param1;
}

/**
* Function to read a udata property from the given interaction.
*/
function getuData(key, ixnId) {
	if (typeof ixnId == 'undefined' || ixnId == null) {
		ixnId = _data.system.context.InteractionID;
	}

	if (typeof ixnId == 'undefined' || ixnId == null || typeof key == 'undefined' || key == null) return null;
	if (typeof _genesys.ixn.interactions[ixnId] == 'undefined') return null;
	if (typeof _genesys.ixn.interactions[ixnId].udata == 'undefined') return null;
	return _genesys.ixn.interactions[ixnId].udata[key];
}

//OCS methods
function getWorkflowRecordURI() {
	var ixnId = _data.system.context.InteractionID;
	if (typeof ixnId != 'undefined'
			&& typeof _genesys.ixn.interactions[ixnId] != 'undefined'
			&& typeof _genesys.ixn.interactions[ixnId].udata != 'undefined') {
		/*pattern: http://ocs.us.int.genesyslab.com:8080/records/15*/
		return _genesys.ixn.interactions[ixnId].udata.GSW_RECORD_URI;
	}
	return "";
}
function getWorkflowOCSURI() {
	var recordURI = getWorkflowRecordURI();
	if (typeof recordURI == 'undefined' || recordURI == null) return undefined;
	var ocsUri = recordURI.match(/(https?:\x2F\x2F[^\x2F]*)/i);
	return (ocsUri != null && ocsUri.length > 0) ? ocsUri[0] : '';
}
function getWorkflowOCSRecord() {
	var ixnId = _data.system.context.InteractionID;
	if (typeof ixnId != 'undefined'
			&& typeof _genesys.ixn.interactions[ixnId] != 'undefined'
			&& typeof _genesys.ixn.interactions[ixnId].udata != 'undefined'
				&& typeof _genesys.ixn.interactions[ixnId].udata.GSW_RECORD_HANDLE != 'undefined') {
		return _genesys.ixn.interactions[ixnId].udata.GSW_RECORD_HANDLE;
	}
	var ocsURI = getWorkflowOCSURI();
	if (typeof ocsURI == 'undefined' || ocsURI == null) return undefined;
	var prefix = ocsURI + '/records/';
	
	var recordURI = getWorkflowRecordURI();
	if (recordURI.indexOf(prefix) != 0) return '';
	return recordURI.substring(prefix.length);
}

// default implementation updates the DN by concatenating it with the access code
function updateResource(access,	// an ECMAScript object which represents switch access code and has following set of properties:
							// prefix, rtype, destination, location and dnis. 
							// Their values match to following switch access code fields: Code, Route Type, Destination Source, Location Source and DNIS Source.
							// see: http://www.genesyslab.info/wiki/index.php?title=Queue_Interface#Events_6
				resource	// see: http://www.genesyslab.info/wiki/index.php?title=Resource_Interface#event.data.resource_Object
				) {
	if (typeof resource != 'undefined' && typeof resource['dn'] != 'undefined'
			&& typeof access != 'undefined' && typeof access['Code'] != 'undefined') {
		var result = JSON.parse(JSON.stringify(resource));	// copy the original resource cos _event.data.resource is a read-only object
		result['dn'] = access['Code'] + resource['dn'];
		return result;
	} else {
		return resource;
	}
}

function getORSLoadBalancerURL() {
	var url = _data.ors_url;
	if (typeof url == 'undefined') return '';
	if (url.length == 0) return url;

	if (url.charAt(url.length - 1) != '/') url += '/';
	url += 'scxml/session/' + _sessionid + '/request/';
	return url;
}