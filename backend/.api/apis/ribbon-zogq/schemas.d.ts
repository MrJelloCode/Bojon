declare const GetAtsIntegrationConnectionLink: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAtsIntegrationJobsAndStagesList: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAtsIntegrationsList: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetClientSecret: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetGenerateMediaUploadDetails: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetPing: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetPingProtected: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetRecruitCatalogPricing: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetRecruiterPlanDetails: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetV1InterviewFlows: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly default: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of interview flows to return.";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The offset for the list of interview flows.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly interview_flows: {
                    readonly type: "array";
                    readonly description: "A list of interview flows.";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly interview_flow_id: {
                                readonly type: "string";
                            };
                            readonly org_name: {
                                readonly type: "string";
                                readonly description: "The name of the organization requesting the interview.";
                            };
                            readonly title: {
                                readonly type: "string";
                                readonly description: "The title for the interview.";
                            };
                            readonly questions: {
                                readonly type: "array";
                                readonly description: "A list of questions to include in the interview.";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly voice_id: {
                                readonly default: "11labs-Kate";
                                readonly enum: readonly ["11labs-Anna", "openai-Onyx", "openai-Shimmer", "11labs-Anthony", "11labs-Kate", "11labs-Amy", any];
                                readonly description: "The voice ID to be used for the interview agent.";
                            };
                            readonly language: {
                                readonly default: "en-US";
                                readonly enum: readonly ["en-US", "de-DE", "es-419", "hi-IN", "ja-JP", "pt-BR", "fr-FR", "zh-CN", "ko-KR", "vi-VN", any];
                                readonly description: "The language of the interview flow.";
                            };
                            readonly company_logo_url: {
                                readonly type: "string";
                                readonly default: any;
                                readonly description: "Optional URL for the company's logo.";
                            };
                            readonly additional_info: {
                                readonly type: "string";
                                readonly default: any;
                                readonly description: "Additional information and context to guide the AI interviewer.";
                            };
                            readonly interview_type: {
                                readonly default: "general";
                                readonly description: "The type of interview.\n\n`recruitment` `general`";
                                readonly type: "string";
                                readonly enum: readonly ["recruitment", "general", any];
                            };
                            readonly is_video_enabled: {
                                readonly type: "boolean";
                                readonly default: false;
                                readonly description: "Whether the interview is video recorded or not.";
                            };
                            readonly is_phone_call_enabled: {
                                readonly type: "boolean";
                                readonly default: true;
                                readonly description: "Whether candidates can phone into interviews instead of online calls or not.";
                            };
                            readonly is_doc_upload_enabled: {
                                readonly type: "boolean";
                                readonly default: false;
                                readonly description: "Whether candidates can add resumes or other documents during the interview or not.";
                            };
                            readonly redirect_url: {
                                readonly type: "string";
                                readonly default: any;
                                readonly description: "The URL where interviewee will be redirected after completing the interview. Make sure you're using the full URL, including https://";
                            };
                            readonly webhook_url: {
                                readonly type: "string";
                                readonly default: any;
                                readonly description: "The URL that will be called after interview processing is complete. The payload will contain interview_flow_id, interview_id, and status.";
                            };
                        };
                        readonly required: readonly ["interview_flow_id", "org_name", "questions", "title"];
                    };
                };
            };
            readonly required: readonly ["interview_flows"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetV1InterviewFlowsInterviewFlowId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly interview_flow_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the interview flow.";
                };
            };
            readonly required: readonly ["interview_flow_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly interview_flow_id: {
                    readonly type: "string";
                };
                readonly org_name: {
                    readonly type: "string";
                    readonly description: "The name of the organization requesting the interview.";
                };
                readonly title: {
                    readonly type: "string";
                    readonly description: "The title for the interview.";
                };
                readonly questions: {
                    readonly type: "array";
                    readonly description: "A list of questions to include in the interview.";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly voice_id: {
                    readonly default: "11labs-Kate";
                    readonly enum: readonly ["11labs-Anna", "openai-Onyx", "openai-Shimmer", "11labs-Anthony", "11labs-Kate", "11labs-Amy", any];
                    readonly description: "The voice ID to be used for the interview agent.";
                };
                readonly language: {
                    readonly default: "en-US";
                    readonly enum: readonly ["en-US", "de-DE", "es-419", "hi-IN", "ja-JP", "pt-BR", "fr-FR", "zh-CN", "ko-KR", "vi-VN", any];
                    readonly description: "The language of the interview flow.";
                };
                readonly company_logo_url: {
                    readonly type: "string";
                    readonly default: any;
                    readonly description: "Optional URL for the company's logo.";
                };
                readonly additional_info: {
                    readonly type: "string";
                    readonly default: any;
                    readonly description: "Additional information and context to guide the AI interviewer.";
                };
                readonly interview_type: {
                    readonly default: "general";
                    readonly description: "The type of interview.\n\n`recruitment` `general`";
                    readonly type: "string";
                    readonly enum: readonly ["recruitment", "general", any];
                };
                readonly is_video_enabled: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly description: "Whether the interview is video recorded or not.";
                };
                readonly is_phone_call_enabled: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly description: "Whether candidates can phone into interviews instead of online calls or not.";
                };
                readonly is_doc_upload_enabled: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly description: "Whether candidates can add resumes or other documents during the interview or not.";
                };
                readonly redirect_url: {
                    readonly type: "string";
                    readonly default: any;
                    readonly description: "The URL where interviewee will be redirected after completing the interview. Make sure you're using the full URL, including https://";
                };
                readonly webhook_url: {
                    readonly type: "string";
                    readonly default: any;
                    readonly description: "The URL that will be called after interview processing is complete. The payload will contain interview_flow_id, interview_id, and status.";
                };
            };
            readonly required: readonly ["interview_flow_id", "org_name", "questions", "title"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "The error message";
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "The status code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The status";
                };
            };
            readonly required: readonly ["code", "message", "status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "The error message";
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "The status code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The status";
                };
            };
            readonly required: readonly ["code", "message", "status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetV1Interviews: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly default: 20;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of interviews to return.";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The offset for the list of interviews.";
                };
                readonly status: {
                    readonly default: "completed";
                    readonly type: "string";
                    readonly enum: readonly ["incomplete", "completed"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The status of the interviews to return.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly interviews: {
                    readonly type: "array";
                    readonly description: "A list of interviews.";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly interview_flow_id: {
                                readonly type: "string";
                                readonly description: "The ID of the interview flow.";
                            };
                            readonly interview_id: {
                                readonly type: "string";
                                readonly description: "The ID of the interview.";
                            };
                            readonly status: {
                                readonly description: "The status of the interview.\n\n`incomplete` `completed`";
                                readonly type: "string";
                                readonly enum: readonly ["incomplete", "completed"];
                            };
                            readonly interview_data: {
                                readonly description: "Data for the completed interview. If the interview is incomplete, this field will be null.";
                                readonly type: "object";
                                readonly required: readonly ["audio_url", "questions_to_transcript_mapping", "transcript", "transcript_with_timestamp"];
                                readonly properties: {
                                    readonly transcript: {
                                        readonly type: "string";
                                        readonly description: "Full transcript of the interview.";
                                    };
                                    readonly transcript_with_timestamp: {
                                        readonly type: "array";
                                        readonly description: "Full transcript of the interview with word-level timestamps.";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly required: readonly ["content", "role", "words"];
                                            readonly properties: {
                                                readonly words: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly required: readonly ["end", "start", "word"];
                                                        readonly properties: {
                                                            readonly end: {
                                                                readonly type: "number";
                                                            };
                                                            readonly start: {
                                                                readonly type: "number";
                                                            };
                                                            readonly word: {
                                                                readonly type: "string";
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly content: {
                                                    readonly type: "string";
                                                };
                                                readonly role: {
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                    };
                                    readonly questions_to_transcript_mapping: {
                                        readonly type: "array";
                                        readonly description: "A mapping of all the script questions to the actual interview transcript segments.";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly required: readonly ["end_timestamp", "script_question", "start_timestamp", "transcript_item_indices", "transcript_items"];
                                            readonly properties: {
                                                readonly script_question: {
                                                    readonly type: "string";
                                                    readonly description: "The question as provided during interview flow creation.";
                                                };
                                                readonly transcript_item_indices: {
                                                    readonly type: "array";
                                                    readonly description: "A list of indices. The indices are the indices of the items in transcript_with_timestamp which are relevant to the script question. It includes the question asked by the agent as well as the user answers, but can also include follow up questions. The indices are often but not necessarily consecutive.";
                                                    readonly items: {
                                                        readonly type: "integer";
                                                    };
                                                };
                                                readonly start_timestamp: {
                                                    readonly type: "number";
                                                    readonly description: "The start timestamp of the section of the recording that is relevant to the script question.";
                                                };
                                                readonly end_timestamp: {
                                                    readonly type: "number";
                                                    readonly description: "The end timestamp of the section of the recording that is relevant to the script question.";
                                                };
                                                readonly transcript_items: {
                                                    readonly type: "array";
                                                    readonly description: "The items in transcript_with_timestamp which are relevant to the script question. For brevity, these items do not include a detailed list of words, but these can be accessed from transcript_with_timestamp by the transcript_item_indices";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly required: readonly ["content", "role"];
                                                        readonly properties: {
                                                            readonly content: {
                                                                readonly type: "string";
                                                            };
                                                            readonly role: {
                                                                readonly type: "string";
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly audio_url: {
                                        readonly type: "string";
                                        readonly description: "Url to the interview audio recording.";
                                    };
                                    readonly video_url: {
                                        readonly type: "string";
                                        readonly default: any;
                                        readonly description: "Url to the interview video recording.";
                                    };
                                };
                            };
                        };
                        readonly required: readonly ["interview_data", "interview_flow_id", "interview_id", "status"];
                    };
                };
            };
            readonly required: readonly ["interviews"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetV1InterviewsInterviewId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly interview_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the interview.";
                };
            };
            readonly required: readonly ["interview_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly interview_flow_id: {
                    readonly type: "string";
                    readonly description: "The ID of the interview flow.";
                };
                readonly interview_id: {
                    readonly type: "string";
                    readonly description: "The ID of the interview.";
                };
                readonly status: {
                    readonly description: "The status of the interview.\n\n`incomplete` `completed`";
                    readonly type: "string";
                    readonly enum: readonly ["incomplete", "completed"];
                };
                readonly interview_data: {
                    readonly description: "Data for the completed interview. If the interview is incomplete, this field will be null.";
                    readonly type: "object";
                    readonly required: readonly ["audio_url", "questions_to_transcript_mapping", "transcript", "transcript_with_timestamp"];
                    readonly properties: {
                        readonly transcript: {
                            readonly type: "string";
                            readonly description: "Full transcript of the interview.";
                        };
                        readonly transcript_with_timestamp: {
                            readonly type: "array";
                            readonly description: "Full transcript of the interview with word-level timestamps.";
                            readonly items: {
                                readonly type: "object";
                                readonly required: readonly ["content", "role", "words"];
                                readonly properties: {
                                    readonly words: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly required: readonly ["end", "start", "word"];
                                            readonly properties: {
                                                readonly end: {
                                                    readonly type: "number";
                                                };
                                                readonly start: {
                                                    readonly type: "number";
                                                };
                                                readonly word: {
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                    };
                                    readonly content: {
                                        readonly type: "string";
                                    };
                                    readonly role: {
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly questions_to_transcript_mapping: {
                            readonly type: "array";
                            readonly description: "A mapping of all the script questions to the actual interview transcript segments.";
                            readonly items: {
                                readonly type: "object";
                                readonly required: readonly ["end_timestamp", "script_question", "start_timestamp", "transcript_item_indices", "transcript_items"];
                                readonly properties: {
                                    readonly script_question: {
                                        readonly type: "string";
                                        readonly description: "The question as provided during interview flow creation.";
                                    };
                                    readonly transcript_item_indices: {
                                        readonly type: "array";
                                        readonly description: "A list of indices. The indices are the indices of the items in transcript_with_timestamp which are relevant to the script question. It includes the question asked by the agent as well as the user answers, but can also include follow up questions. The indices are often but not necessarily consecutive.";
                                        readonly items: {
                                            readonly type: "integer";
                                        };
                                    };
                                    readonly start_timestamp: {
                                        readonly type: "number";
                                        readonly description: "The start timestamp of the section of the recording that is relevant to the script question.";
                                    };
                                    readonly end_timestamp: {
                                        readonly type: "number";
                                        readonly description: "The end timestamp of the section of the recording that is relevant to the script question.";
                                    };
                                    readonly transcript_items: {
                                        readonly type: "array";
                                        readonly description: "The items in transcript_with_timestamp which are relevant to the script question. For brevity, these items do not include a detailed list of words, but these can be accessed from transcript_with_timestamp by the transcript_item_indices";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly required: readonly ["content", "role"];
                                            readonly properties: {
                                                readonly content: {
                                                    readonly type: "string";
                                                };
                                                readonly role: {
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly audio_url: {
                            readonly type: "string";
                            readonly description: "Url to the interview audio recording.";
                        };
                        readonly video_url: {
                            readonly type: "string";
                            readonly default: any;
                            readonly description: "Url to the interview video recording.";
                        };
                    };
                };
            };
            readonly required: readonly ["interview_data", "interview_flow_id", "interview_id", "status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "The error message";
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "The status code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The status";
                };
            };
            readonly required: readonly ["code", "message", "status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "The error message";
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "The status code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The status";
                };
            };
            readonly required: readonly ["code", "message", "status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetV1Ping: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Returns 'pong'";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostAcceptOrgInvite: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostAddBotToCalendarEvent: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostAddPipelineMembersFromCsv: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostApplyJob: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostAutoFillProfile: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCommentPost: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostConfirmSlackIntegration: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostConfirmVerification: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCreateCalendarFromOauth: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCreateCustomScoringFromFile: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCreateInterviewFlow: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCreatePost: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCreateUnregisteredOrg: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCreateVideoProfile: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostDeleteIntegration: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostDeleteRecruitingTeam: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostDeleteUser: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostExcludeFromRecruitingTeam: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostExtractInterviewFlowFromFreeText: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostFollowUser: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostGetCalendarEvents: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostGetCompanyDetailsFromWebsite: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostGetDemoInterviewCallId: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostGetInterviewCallId: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostGetInterviewPhoneNumber: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostGetSlackChannels: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostGetStripeSubscriptionPortal: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostInviteFriendsToRibbon: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostKomboWebhook: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostLeaveRecruitingTeam: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostLikePost: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostMergedRecruitmentVideoWebhook: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostNewDocument: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostNewUser: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostOnCandidatePublishedInterviewCallUpdate: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostOnDocumentUpdate: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostOnOnboardingUpdate: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostRecallWebhook: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostRedeem: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostRemoveBotsFromCalendarEvent: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostReplacePracticeRound: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostRequestAccessToTalentHubCandidateInterview: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostRespondToInvitationToJoinRecruitingTeam: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostRetellWebhook: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostRevokeSlackIntegration: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSaveCustomScores: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSaveJob: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSendInvitationToJoinRecruitingTeam: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSetupOrg: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSetupStripeAccount: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSetupStripeCheckoutSession: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSetupStripeIdVerification: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostShareResumePlus: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSignUpAndJoinOrg: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostStripeAccountWebhook: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostStripeConnectWebhook: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSubmitFeedback: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostToggleAutojoin: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostUnfollowUser: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostUnlikePost: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostUpdateInterviewFlow: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostUpdateUserChatContext: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostUpsertRecruitingPlan: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostUpsertTimelineModule: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1InterviewFlows: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly org_name: {
                readonly type: "string";
                readonly description: "The name of the organization requesting the interview.";
            };
            readonly title: {
                readonly type: "string";
                readonly description: "The title for the interview.";
            };
            readonly questions: {
                readonly type: "array";
                readonly description: "A list of questions to include in the interview.";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly voice_id: {
                readonly default: "11labs-Kate";
                readonly enum: readonly ["11labs-Anna", "openai-Onyx", "openai-Shimmer", "11labs-Anthony", "11labs-Kate", "11labs-Amy", any];
                readonly description: "The voice ID to be used for the interview agent.";
            };
            readonly language: {
                readonly default: "en-US";
                readonly enum: readonly ["en-US", "de-DE", "es-419", "hi-IN", "ja-JP", "pt-BR", "fr-FR", "zh-CN", "ko-KR", "vi-VN", any];
                readonly description: "The language of the interview flow.";
            };
            readonly company_logo_url: {
                readonly type: "string";
                readonly default: any;
                readonly description: "Optional URL for the company's logo.";
            };
            readonly additional_info: {
                readonly type: "string";
                readonly default: any;
                readonly description: "Additional information and context to guide the AI interviewer.";
            };
            readonly interview_type: {
                readonly default: "general";
                readonly description: "The type of interview.";
                readonly type: "string";
                readonly enum: readonly ["recruitment", "general", any];
            };
            readonly is_video_enabled: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Whether the interview is video recorded or not.";
            };
            readonly is_phone_call_enabled: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "Whether candidates can phone into interviews instead of online calls or not.";
            };
            readonly is_doc_upload_enabled: {
                readonly type: "boolean";
                readonly default: false;
                readonly description: "Whether candidates can add resumes or other documents during the interview or not.";
            };
            readonly redirect_url: {
                readonly type: "string";
                readonly default: any;
                readonly description: "The URL where interviewee will be redirected after completing the interview. Make sure you're using the full URL, including https://";
            };
            readonly webhook_url: {
                readonly type: "string";
                readonly default: any;
                readonly description: "The URL that will be called after interview processing is complete. The payload will contain interview_flow_id, interview_id, and status.";
            };
        };
        readonly required: readonly ["org_name", "questions", "title"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly interview_flow_id: {
                    readonly type: "string";
                    readonly description: "The ID of the interview flow.";
                };
            };
            readonly required: readonly ["interview_flow_id"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "The error message";
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "The status code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The status";
                };
            };
            readonly required: readonly ["code", "message", "status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1Interviews: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly interview_flow_id: {
                readonly type: "string";
                readonly description: "The interview flow ID.";
            };
            readonly interviewee_email_address: {
                readonly type: "string";
                readonly default: any;
                readonly description: "The interviewee email address. This is used to identify the interviewee on the Ribbon platform. If not provided, this interview will not appear on the Ribbon platform";
            };
            readonly interviewee_first_name: {
                readonly type: "string";
                readonly default: any;
                readonly description: "The interviewee first name.";
            };
            readonly interviewee_last_name: {
                readonly type: "string";
                readonly default: any;
                readonly description: "The interviewee last name.";
            };
        };
        readonly required: readonly ["interview_flow_id"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly interview_id: {
                    readonly type: "string";
                    readonly description: "The ID of the created interview.";
                };
                readonly interview_link: {
                    readonly type: "string";
                    readonly description: "The single-use link to begin and conduct the interview.";
                };
                readonly hint: {
                    readonly type: "string";
                    readonly default: any;
                    readonly description: "Helpful hint about interview visibility.";
                };
            };
            readonly required: readonly ["interview_id", "interview_link"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "The error message";
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "The status code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The status";
                };
            };
            readonly required: readonly ["code", "message", "status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "422": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "The error message";
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "The status code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The status";
                };
            };
            readonly required: readonly ["code", "message", "status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostViewJob: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostViewPost: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostViewProfile: {
    readonly response: {
        readonly default: {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Error code";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Error name";
                };
                readonly message: {
                    readonly type: "string";
                    readonly description: "Error message";
                };
                readonly errors: {
                    readonly type: "object";
                    readonly description: "Errors";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { GetAtsIntegrationConnectionLink, GetAtsIntegrationJobsAndStagesList, GetAtsIntegrationsList, GetClientSecret, GetGenerateMediaUploadDetails, GetPing, GetPingProtected, GetRecruitCatalogPricing, GetRecruiterPlanDetails, GetV1InterviewFlows, GetV1InterviewFlowsInterviewFlowId, GetV1Interviews, GetV1InterviewsInterviewId, GetV1Ping, PostAcceptOrgInvite, PostAddBotToCalendarEvent, PostAddPipelineMembersFromCsv, PostApplyJob, PostAutoFillProfile, PostCommentPost, PostConfirmSlackIntegration, PostConfirmVerification, PostCreateCalendarFromOauth, PostCreateCustomScoringFromFile, PostCreateInterviewFlow, PostCreatePost, PostCreateUnregisteredOrg, PostCreateVideoProfile, PostDeleteIntegration, PostDeleteRecruitingTeam, PostDeleteUser, PostExcludeFromRecruitingTeam, PostExtractInterviewFlowFromFreeText, PostFollowUser, PostGetCalendarEvents, PostGetCompanyDetailsFromWebsite, PostGetDemoInterviewCallId, PostGetInterviewCallId, PostGetInterviewPhoneNumber, PostGetSlackChannels, PostGetStripeSubscriptionPortal, PostInviteFriendsToRibbon, PostKomboWebhook, PostLeaveRecruitingTeam, PostLikePost, PostMergedRecruitmentVideoWebhook, PostNewDocument, PostNewUser, PostOnCandidatePublishedInterviewCallUpdate, PostOnDocumentUpdate, PostOnOnboardingUpdate, PostRecallWebhook, PostRedeem, PostRemoveBotsFromCalendarEvent, PostReplacePracticeRound, PostRequestAccessToTalentHubCandidateInterview, PostRespondToInvitationToJoinRecruitingTeam, PostRetellWebhook, PostRevokeSlackIntegration, PostSaveCustomScores, PostSaveJob, PostSendInvitationToJoinRecruitingTeam, PostSetupOrg, PostSetupStripeAccount, PostSetupStripeCheckoutSession, PostSetupStripeIdVerification, PostShareResumePlus, PostSignUpAndJoinOrg, PostStripeAccountWebhook, PostStripeConnectWebhook, PostSubmitFeedback, PostToggleAutojoin, PostUnfollowUser, PostUnlikePost, PostUpdateInterviewFlow, PostUpdateUserChatContext, PostUpsertRecruitingPlan, PostUpsertTimelineModule, PostV1InterviewFlows, PostV1Interviews, PostViewJob, PostViewPost, PostViewProfile };
