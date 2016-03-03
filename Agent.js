var mongoose	= require('mongoose');
var Schema 		= mongoose.Schema;

var AgentSchema = new Schema({
	agentID			: String,
	agentName		: String,
	haveWWW			: Boolean,
	onHomePage		: Boolean,
	brandedBanner	: Boolean,
	aboveTheFold	: Boolean,
	onFacebook		: Boolean,
	dateAdded		: Date,
	dateModified	: Date,
	portalLink		: String,
	validSlug		: Boolean,
	websiteLink		: String
});

var Agent = mongoose.model('Agent', AgentSchema);

module.exports = Agent;