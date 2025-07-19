"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'ribbon-zogq/v1 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    SDK.prototype.getV1Ping = function () {
        return this.core.fetch('/v1/ping', 'get');
    };
    /** @throws FetchError<422, types.GetV1InterviewsResponse422> Unprocessable Entity */
    SDK.prototype.getV1Interviews = function (metadata) {
        return this.core.fetch('/v1/interviews', 'get', metadata);
    };
    /**
     * @throws FetchError<403, types.PostV1InterviewsResponse403> The interview flow found does not belong to authenticated team or was not created via
     * API.
     * @throws FetchError<422, types.PostV1InterviewsResponse422> No interview flow found with provided interview_flow_id.
     */
    SDK.prototype.postV1Interviews = function (body) {
        return this.core.fetch('/v1/interviews', 'post', body);
    };
    /**
     * @throws FetchError<403, types.GetV1InterviewsInterviewIdResponse403> The interview found does not belong to authenticated team.
     * @throws FetchError<422, types.GetV1InterviewsInterviewIdResponse422> No interview found with provided interview_session_id.
     */
    SDK.prototype.getV1InterviewsInterview_id = function (metadata) {
        return this.core.fetch('/v1/interviews/{interview_id}', 'get', metadata);
    };
    /** @throws FetchError<422, types.GetV1InterviewFlowsResponse422> Unprocessable Entity */
    SDK.prototype.getV1InterviewFlows = function (metadata) {
        return this.core.fetch('/v1/interview-flows', 'get', metadata);
    };
    /**
     * @throws FetchError<422, types.PostV1InterviewFlowsResponse422> Unable to use file provided for company_logo_url, please provide valid url, supported
     * image types are image/jpeg and image/png
     */
    SDK.prototype.postV1InterviewFlows = function (body) {
        return this.core.fetch('/v1/interview-flows', 'post', body);
    };
    /**
     * @throws FetchError<403, types.GetV1InterviewFlowsInterviewFlowIdResponse403> The interview flow found does not belong to authenticated team or was not created via
     * API.
     * @throws FetchError<422, types.GetV1InterviewFlowsInterviewFlowIdResponse422> No interview flow found with provided interview_flow_id.
     */
    SDK.prototype.getV1InterviewFlowsInterview_flow_id = function (metadata) {
        return this.core.fetch('/v1/interview-flows/{interview_flow_id}', 'get', metadata);
    };
    SDK.prototype.getPing = function () {
        return this.core.fetch('/ping', 'get');
    };
    SDK.prototype.getPingProtected = function () {
        return this.core.fetch('/ping-protected', 'get');
    };
    SDK.prototype.postNewUser = function () {
        return this.core.fetch('/new-user', 'post');
    };
    SDK.prototype.postSetupOrg = function () {
        return this.core.fetch('/setup-org', 'post');
    };
    SDK.prototype.postCreateUnregisteredOrg = function () {
        return this.core.fetch('/create-unregistered-org', 'post');
    };
    SDK.prototype.postSignUpAndJoinOrg = function () {
        return this.core.fetch('/sign-up-and-join-org', 'post');
    };
    SDK.prototype.postAcceptOrgInvite = function () {
        return this.core.fetch('/accept-org-invite', 'post');
    };
    SDK.prototype.postConfirmSlackIntegration = function () {
        return this.core.fetch('/confirm-slack-integration', 'post');
    };
    SDK.prototype.postGetSlackChannels = function () {
        return this.core.fetch('/get-slack-channels', 'post');
    };
    SDK.prototype.postRevokeSlackIntegration = function () {
        return this.core.fetch('/revoke-slack-integration', 'post');
    };
    SDK.prototype.postSubmitFeedback = function () {
        return this.core.fetch('/submit-feedback', 'post');
    };
    SDK.prototype.postConfirmVerification = function () {
        return this.core.fetch('/confirm-verification', 'post');
    };
    SDK.prototype.postToggleAutojoin = function () {
        return this.core.fetch('/toggle-autojoin', 'post');
    };
    SDK.prototype.getGenerateMediaUploadDetails = function () {
        return this.core.fetch('/generate-media-upload-details', 'get');
    };
    SDK.prototype.postCreateVideoProfile = function () {
        return this.core.fetch('/create-video-profile', 'post');
    };
    SDK.prototype.postUpsertTimelineModule = function () {
        return this.core.fetch('/upsert-timeline-module', 'post');
    };
    SDK.prototype.postDeleteUser = function () {
        return this.core.fetch('/delete-user', 'post');
    };
    SDK.prototype.postViewJob = function () {
        return this.core.fetch('/view-job', 'post');
    };
    SDK.prototype.postSaveJob = function () {
        return this.core.fetch('/save-job', 'post');
    };
    SDK.prototype.postApplyJob = function () {
        return this.core.fetch('/apply-job', 'post');
    };
    SDK.prototype.postFollowUser = function () {
        return this.core.fetch('/follow-user', 'post');
    };
    SDK.prototype.postUnfollowUser = function () {
        return this.core.fetch('/unfollow-user', 'post');
    };
    SDK.prototype.postLikePost = function () {
        return this.core.fetch('/like-post', 'post');
    };
    SDK.prototype.postUnlikePost = function () {
        return this.core.fetch('/unlike-post', 'post');
    };
    SDK.prototype.postCommentPost = function () {
        return this.core.fetch('/comment-post', 'post');
    };
    SDK.prototype.postViewProfile = function () {
        return this.core.fetch('/view-profile', 'post');
    };
    SDK.prototype.postViewPost = function () {
        return this.core.fetch('/view-post', 'post');
    };
    SDK.prototype.postCreatePost = function () {
        return this.core.fetch('/create-post', 'post');
    };
    SDK.prototype.postSetupStripeAccount = function () {
        return this.core.fetch('/setup-stripe-account', 'post');
    };
    SDK.prototype.postSetupStripeIdVerification = function () {
        return this.core.fetch('/setup-stripe-id-verification', 'post');
    };
    SDK.prototype.postSetupStripeCheckoutSession = function () {
        return this.core.fetch('/setup-stripe-checkout-session', 'post');
    };
    SDK.prototype.postGetStripeSubscriptionPortal = function () {
        return this.core.fetch('/get-stripe-subscription-portal', 'post');
    };
    SDK.prototype.postRedeem = function () {
        return this.core.fetch('/redeem', 'post');
    };
    SDK.prototype.postStripeConnectWebhook = function () {
        return this.core.fetch('/stripe-connect-webhook', 'post');
    };
    SDK.prototype.postStripeAccountWebhook = function () {
        return this.core.fetch('/stripe-account-webhook', 'post');
    };
    SDK.prototype.postNewDocument = function () {
        return this.core.fetch('/new-document', 'post');
    };
    SDK.prototype.postShareResumePlus = function () {
        return this.core.fetch('/share-resume-plus', 'post');
    };
    SDK.prototype.postReplacePracticeRound = function () {
        return this.core.fetch('/replace-practice-round', 'post');
    };
    SDK.prototype.postUpdateUserChatContext = function () {
        return this.core.fetch('/update-user-chat-context', 'post');
    };
    SDK.prototype.postOnDocumentUpdate = function () {
        return this.core.fetch('/on-document-update', 'post');
    };
    SDK.prototype.postOnOnboardingUpdate = function () {
        return this.core.fetch('/on-onboarding-update', 'post');
    };
    SDK.prototype.postOnCandidatePublishedInterviewCallUpdate = function () {
        return this.core.fetch('/on-candidate-published-interview-call-update', 'post');
    };
    SDK.prototype.postAutoFillProfile = function () {
        return this.core.fetch('/auto-fill-profile', 'post');
    };
    SDK.prototype.postCreateInterviewFlow = function () {
        return this.core.fetch('/create-interview-flow', 'post');
    };
    SDK.prototype.postUpsertRecruitingPlan = function () {
        return this.core.fetch('/upsert-recruiting-plan', 'post');
    };
    SDK.prototype.getClientSecret = function () {
        return this.core.fetch('/get-client-secret', 'get');
    };
    SDK.prototype.postGetInterviewCallId = function () {
        return this.core.fetch('/get-interview-call-id', 'post');
    };
    SDK.prototype.postGetDemoInterviewCallId = function () {
        return this.core.fetch('/get-demo-interview-call-id', 'post');
    };
    SDK.prototype.postRetellWebhook = function () {
        return this.core.fetch('/retell-webhook', 'post');
    };
    SDK.prototype.postKomboWebhook = function () {
        return this.core.fetch('/kombo-webhook', 'post');
    };
    SDK.prototype.postUpdateInterviewFlow = function () {
        return this.core.fetch('/update-interview-flow', 'post');
    };
    SDK.prototype.getAtsIntegrationJobsAndStagesList = function () {
        return this.core.fetch('/get-ats-integration-jobs-and-stages-list', 'get');
    };
    SDK.prototype.getAtsIntegrationConnectionLink = function () {
        return this.core.fetch('/get-ats-integration-connection-link', 'get');
    };
    SDK.prototype.postDeleteIntegration = function () {
        return this.core.fetch('/delete-integration', 'post');
    };
    SDK.prototype.getAtsIntegrationsList = function () {
        return this.core.fetch('/get-ats-integrations-list', 'get');
    };
    SDK.prototype.postGetInterviewPhoneNumber = function () {
        return this.core.fetch('/get-interview-phone-number', 'post');
    };
    SDK.prototype.postInviteFriendsToRibbon = function () {
        return this.core.fetch('/invite-friends-to-ribbon', 'post');
    };
    SDK.prototype.postSendInvitationToJoinRecruitingTeam = function () {
        return this.core.fetch('/send-invitation-to-join-recruiting-team', 'post');
    };
    SDK.prototype.postRespondToInvitationToJoinRecruitingTeam = function () {
        return this.core.fetch('/respond-to-invitation-to-join-recruiting-team', 'post');
    };
    SDK.prototype.postExcludeFromRecruitingTeam = function () {
        return this.core.fetch('/exclude-from-recruiting-team', 'post');
    };
    SDK.prototype.postLeaveRecruitingTeam = function () {
        return this.core.fetch('/leave-recruiting-team', 'post');
    };
    SDK.prototype.postDeleteRecruitingTeam = function () {
        return this.core.fetch('/delete-recruiting-team', 'post');
    };
    SDK.prototype.getRecruiterPlanDetails = function () {
        return this.core.fetch('/get-recruiter-plan-details', 'get');
    };
    SDK.prototype.getRecruitCatalogPricing = function () {
        return this.core.fetch('/get-recruit-catalog-pricing', 'get');
    };
    SDK.prototype.postRequestAccessToTalentHubCandidateInterview = function () {
        return this.core.fetch('/request-access-to-talent-hub-candidate-interview', 'post');
    };
    SDK.prototype.postExtractInterviewFlowFromFreeText = function () {
        return this.core.fetch('/extract-interview-flow-from-free-text', 'post');
    };
    SDK.prototype.postAddPipelineMembersFromCsv = function () {
        return this.core.fetch('/add-pipeline-members-from-csv', 'post');
    };
    SDK.prototype.postCreateCalendarFromOauth = function () {
        return this.core.fetch('/create-calendar-from-oauth', 'post');
    };
    SDK.prototype.postRecallWebhook = function () {
        return this.core.fetch('/recall-webhook', 'post');
    };
    SDK.prototype.postGetCalendarEvents = function () {
        return this.core.fetch('/get-calendar-events', 'post');
    };
    SDK.prototype.postAddBotToCalendarEvent = function () {
        return this.core.fetch('/add-bot-to-calendar-event', 'post');
    };
    SDK.prototype.postRemoveBotsFromCalendarEvent = function () {
        return this.core.fetch('/remove-bots-from-calendar-event', 'post');
    };
    SDK.prototype.postSaveCustomScores = function () {
        return this.core.fetch('/save-custom-scores', 'post');
    };
    SDK.prototype.postCreateCustomScoringFromFile = function () {
        return this.core.fetch('/create-custom-scoring-from-file', 'post');
    };
    SDK.prototype.postMergedRecruitmentVideoWebhook = function () {
        return this.core.fetch('/merged-recruitment-video-webhook', 'post');
    };
    SDK.prototype.postGetCompanyDetailsFromWebsite = function () {
        return this.core.fetch('/get-company-details-from-website', 'post');
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
