import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
    getV1Ping(): Promise<FetchResponse<200, types.GetV1PingResponse200> | FetchResponse<number, types.GetV1PingResponseDefault>>;
    /** @throws FetchError<422, types.GetV1InterviewsResponse422> Unprocessable Entity */
    getV1Interviews(metadata?: types.GetV1InterviewsMetadataParam): Promise<FetchResponse<200, types.GetV1InterviewsResponse200> | FetchResponse<number, types.GetV1InterviewsResponseDefault>>;
    /**
     * @throws FetchError<403, types.PostV1InterviewsResponse403> The interview flow found does not belong to authenticated team or was not created via
     * API.
     * @throws FetchError<422, types.PostV1InterviewsResponse422> No interview flow found with provided interview_flow_id.
     */
    postV1Interviews(body: types.PostV1InterviewsBodyParam): Promise<FetchResponse<200, types.PostV1InterviewsResponse200> | FetchResponse<number, types.PostV1InterviewsResponseDefault>>;
    /**
     * @throws FetchError<403, types.GetV1InterviewsInterviewIdResponse403> The interview found does not belong to authenticated team.
     * @throws FetchError<422, types.GetV1InterviewsInterviewIdResponse422> No interview found with provided interview_session_id.
     */
    getV1InterviewsInterview_id(metadata: types.GetV1InterviewsInterviewIdMetadataParam): Promise<FetchResponse<200, types.GetV1InterviewsInterviewIdResponse200> | FetchResponse<number, types.GetV1InterviewsInterviewIdResponseDefault>>;
    /** @throws FetchError<422, types.GetV1InterviewFlowsResponse422> Unprocessable Entity */
    getV1InterviewFlows(metadata?: types.GetV1InterviewFlowsMetadataParam): Promise<FetchResponse<200, types.GetV1InterviewFlowsResponse200> | FetchResponse<number, types.GetV1InterviewFlowsResponseDefault>>;
    /**
     * @throws FetchError<422, types.PostV1InterviewFlowsResponse422> Unable to use file provided for company_logo_url, please provide valid url, supported
     * image types are image/jpeg and image/png
     */
    postV1InterviewFlows(body: types.PostV1InterviewFlowsBodyParam): Promise<FetchResponse<200, types.PostV1InterviewFlowsResponse200> | FetchResponse<number, types.PostV1InterviewFlowsResponseDefault>>;
    /**
     * @throws FetchError<403, types.GetV1InterviewFlowsInterviewFlowIdResponse403> The interview flow found does not belong to authenticated team or was not created via
     * API.
     * @throws FetchError<422, types.GetV1InterviewFlowsInterviewFlowIdResponse422> No interview flow found with provided interview_flow_id.
     */
    getV1InterviewFlowsInterview_flow_id(metadata: types.GetV1InterviewFlowsInterviewFlowIdMetadataParam): Promise<FetchResponse<200, types.GetV1InterviewFlowsInterviewFlowIdResponse200> | FetchResponse<number, types.GetV1InterviewFlowsInterviewFlowIdResponseDefault>>;
    getPing(): Promise<FetchResponse<number, types.GetPingResponseDefault>>;
    getPingProtected(): Promise<FetchResponse<number, types.GetPingProtectedResponseDefault>>;
    postNewUser(): Promise<FetchResponse<number, types.PostNewUserResponseDefault>>;
    postSetupOrg(): Promise<FetchResponse<number, types.PostSetupOrgResponseDefault>>;
    postCreateUnregisteredOrg(): Promise<FetchResponse<number, types.PostCreateUnregisteredOrgResponseDefault>>;
    postSignUpAndJoinOrg(): Promise<FetchResponse<number, types.PostSignUpAndJoinOrgResponseDefault>>;
    postAcceptOrgInvite(): Promise<FetchResponse<number, types.PostAcceptOrgInviteResponseDefault>>;
    postConfirmSlackIntegration(): Promise<FetchResponse<number, types.PostConfirmSlackIntegrationResponseDefault>>;
    postGetSlackChannels(): Promise<FetchResponse<number, types.PostGetSlackChannelsResponseDefault>>;
    postRevokeSlackIntegration(): Promise<FetchResponse<number, types.PostRevokeSlackIntegrationResponseDefault>>;
    postSubmitFeedback(): Promise<FetchResponse<number, types.PostSubmitFeedbackResponseDefault>>;
    postConfirmVerification(): Promise<FetchResponse<number, types.PostConfirmVerificationResponseDefault>>;
    postToggleAutojoin(): Promise<FetchResponse<number, types.PostToggleAutojoinResponseDefault>>;
    getGenerateMediaUploadDetails(): Promise<FetchResponse<number, types.GetGenerateMediaUploadDetailsResponseDefault>>;
    postCreateVideoProfile(): Promise<FetchResponse<number, types.PostCreateVideoProfileResponseDefault>>;
    postUpsertTimelineModule(): Promise<FetchResponse<number, types.PostUpsertTimelineModuleResponseDefault>>;
    postDeleteUser(): Promise<FetchResponse<number, types.PostDeleteUserResponseDefault>>;
    postViewJob(): Promise<FetchResponse<number, types.PostViewJobResponseDefault>>;
    postSaveJob(): Promise<FetchResponse<number, types.PostSaveJobResponseDefault>>;
    postApplyJob(): Promise<FetchResponse<number, types.PostApplyJobResponseDefault>>;
    postFollowUser(): Promise<FetchResponse<number, types.PostFollowUserResponseDefault>>;
    postUnfollowUser(): Promise<FetchResponse<number, types.PostUnfollowUserResponseDefault>>;
    postLikePost(): Promise<FetchResponse<number, types.PostLikePostResponseDefault>>;
    postUnlikePost(): Promise<FetchResponse<number, types.PostUnlikePostResponseDefault>>;
    postCommentPost(): Promise<FetchResponse<number, types.PostCommentPostResponseDefault>>;
    postViewProfile(): Promise<FetchResponse<number, types.PostViewProfileResponseDefault>>;
    postViewPost(): Promise<FetchResponse<number, types.PostViewPostResponseDefault>>;
    postCreatePost(): Promise<FetchResponse<number, types.PostCreatePostResponseDefault>>;
    postSetupStripeAccount(): Promise<FetchResponse<number, types.PostSetupStripeAccountResponseDefault>>;
    postSetupStripeIdVerification(): Promise<FetchResponse<number, types.PostSetupStripeIdVerificationResponseDefault>>;
    postSetupStripeCheckoutSession(): Promise<FetchResponse<number, types.PostSetupStripeCheckoutSessionResponseDefault>>;
    postGetStripeSubscriptionPortal(): Promise<FetchResponse<number, types.PostGetStripeSubscriptionPortalResponseDefault>>;
    postRedeem(): Promise<FetchResponse<number, types.PostRedeemResponseDefault>>;
    postStripeConnectWebhook(): Promise<FetchResponse<number, types.PostStripeConnectWebhookResponseDefault>>;
    postStripeAccountWebhook(): Promise<FetchResponse<number, types.PostStripeAccountWebhookResponseDefault>>;
    postNewDocument(): Promise<FetchResponse<number, types.PostNewDocumentResponseDefault>>;
    postShareResumePlus(): Promise<FetchResponse<number, types.PostShareResumePlusResponseDefault>>;
    postReplacePracticeRound(): Promise<FetchResponse<number, types.PostReplacePracticeRoundResponseDefault>>;
    postUpdateUserChatContext(): Promise<FetchResponse<number, types.PostUpdateUserChatContextResponseDefault>>;
    postOnDocumentUpdate(): Promise<FetchResponse<number, types.PostOnDocumentUpdateResponseDefault>>;
    postOnOnboardingUpdate(): Promise<FetchResponse<number, types.PostOnOnboardingUpdateResponseDefault>>;
    postOnCandidatePublishedInterviewCallUpdate(): Promise<FetchResponse<number, types.PostOnCandidatePublishedInterviewCallUpdateResponseDefault>>;
    postAutoFillProfile(): Promise<FetchResponse<number, types.PostAutoFillProfileResponseDefault>>;
    postCreateInterviewFlow(): Promise<FetchResponse<number, types.PostCreateInterviewFlowResponseDefault>>;
    postUpsertRecruitingPlan(): Promise<FetchResponse<number, types.PostUpsertRecruitingPlanResponseDefault>>;
    getClientSecret(): Promise<FetchResponse<number, types.GetClientSecretResponseDefault>>;
    postGetInterviewCallId(): Promise<FetchResponse<number, types.PostGetInterviewCallIdResponseDefault>>;
    postGetDemoInterviewCallId(): Promise<FetchResponse<number, types.PostGetDemoInterviewCallIdResponseDefault>>;
    postRetellWebhook(): Promise<FetchResponse<number, types.PostRetellWebhookResponseDefault>>;
    postKomboWebhook(): Promise<FetchResponse<number, types.PostKomboWebhookResponseDefault>>;
    postUpdateInterviewFlow(): Promise<FetchResponse<number, types.PostUpdateInterviewFlowResponseDefault>>;
    getAtsIntegrationJobsAndStagesList(): Promise<FetchResponse<number, types.GetAtsIntegrationJobsAndStagesListResponseDefault>>;
    getAtsIntegrationConnectionLink(): Promise<FetchResponse<number, types.GetAtsIntegrationConnectionLinkResponseDefault>>;
    postDeleteIntegration(): Promise<FetchResponse<number, types.PostDeleteIntegrationResponseDefault>>;
    getAtsIntegrationsList(): Promise<FetchResponse<number, types.GetAtsIntegrationsListResponseDefault>>;
    postGetInterviewPhoneNumber(): Promise<FetchResponse<number, types.PostGetInterviewPhoneNumberResponseDefault>>;
    postInviteFriendsToRibbon(): Promise<FetchResponse<number, types.PostInviteFriendsToRibbonResponseDefault>>;
    postSendInvitationToJoinRecruitingTeam(): Promise<FetchResponse<number, types.PostSendInvitationToJoinRecruitingTeamResponseDefault>>;
    postRespondToInvitationToJoinRecruitingTeam(): Promise<FetchResponse<number, types.PostRespondToInvitationToJoinRecruitingTeamResponseDefault>>;
    postExcludeFromRecruitingTeam(): Promise<FetchResponse<number, types.PostExcludeFromRecruitingTeamResponseDefault>>;
    postLeaveRecruitingTeam(): Promise<FetchResponse<number, types.PostLeaveRecruitingTeamResponseDefault>>;
    postDeleteRecruitingTeam(): Promise<FetchResponse<number, types.PostDeleteRecruitingTeamResponseDefault>>;
    getRecruiterPlanDetails(): Promise<FetchResponse<number, types.GetRecruiterPlanDetailsResponseDefault>>;
    getRecruitCatalogPricing(): Promise<FetchResponse<number, types.GetRecruitCatalogPricingResponseDefault>>;
    postRequestAccessToTalentHubCandidateInterview(): Promise<FetchResponse<number, types.PostRequestAccessToTalentHubCandidateInterviewResponseDefault>>;
    postExtractInterviewFlowFromFreeText(): Promise<FetchResponse<number, types.PostExtractInterviewFlowFromFreeTextResponseDefault>>;
    postAddPipelineMembersFromCsv(): Promise<FetchResponse<number, types.PostAddPipelineMembersFromCsvResponseDefault>>;
    postCreateCalendarFromOauth(): Promise<FetchResponse<number, types.PostCreateCalendarFromOauthResponseDefault>>;
    postRecallWebhook(): Promise<FetchResponse<number, types.PostRecallWebhookResponseDefault>>;
    postGetCalendarEvents(): Promise<FetchResponse<number, types.PostGetCalendarEventsResponseDefault>>;
    postAddBotToCalendarEvent(): Promise<FetchResponse<number, types.PostAddBotToCalendarEventResponseDefault>>;
    postRemoveBotsFromCalendarEvent(): Promise<FetchResponse<number, types.PostRemoveBotsFromCalendarEventResponseDefault>>;
    postSaveCustomScores(): Promise<FetchResponse<number, types.PostSaveCustomScoresResponseDefault>>;
    postCreateCustomScoringFromFile(): Promise<FetchResponse<number, types.PostCreateCustomScoringFromFileResponseDefault>>;
    postMergedRecruitmentVideoWebhook(): Promise<FetchResponse<number, types.PostMergedRecruitmentVideoWebhookResponseDefault>>;
    postGetCompanyDetailsFromWebsite(): Promise<FetchResponse<number, types.PostGetCompanyDetailsFromWebsiteResponseDefault>>;
}
declare const createSDK: SDK;
export = createSDK;
