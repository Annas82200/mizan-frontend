mizan-server@1.0.0 build
> tsc

src/routes/admin.ts(28,26): error TS7030: Not all code paths return a value.
src/routes/admin.ts(106,26): error TS7030: Not all code paths return a value.
src/routes/admin.ts(128,27): error TS7030: Not all code paths return a value.
src/routes/admin.ts(167,22): error TS7030: Not all code paths return a value.
src/routes/admin.ts(212,30): error TS7030: Not all code paths return a value.
src/routes/admin.ts(288,25): error TS7030: Not all code paths return a value.
src/routes/admin.ts(311,25): error TS7030: Not all code paths return a value.
src/routes/admin.ts(335,29): error TS7030: Not all code paths return a value.
src/routes/admin.ts(367,28): error TS7030: Not all code paths return a value.
src/routes/admin.ts(389,32): error TS7030: Not all code paths return a value.
src/routes/employee.ts(57,57): error TS2769: No overload matches this call.
  Overload 1 of 2, '(predicate: (value: { id: string; tenantId: string; employeeId: string; createdAt: Date; updatedAt: Date; status: string; learningPathId: string | null; metadata: unknown; startDate: Date | null; ... 10 more ...; rating: number | null; }, index: number, array: { ...; }[]) => value is { ...; }, thisArg?: any): { ...; }[]', gave the following error.
    Argument of type '(l: CourseEnrollment) => boolean' is not assignable to parameter of type '(value: { id: string; tenantId: string; employeeId: string; createdAt: Date; updatedAt: Date; status: string; learningPathId: string | null; metadata: unknown; startDate: Date | null; ... 10 more ...; rating: number | null; }, index: number, array: { ...; }[]) => value is { ...; }'.
      Types of parameters 'l' and 'value' are incompatible.
        Property 'completedAt' is missing in type '{ id: string; tenantId: string; employeeId: string; createdAt: Date; updatedAt: Date; status: string; learningPathId: string | null; metadata: unknown; startDate: Date | null; feedback: unknown; ... 9 more ...; rating: number | null; }' but required in type 'CourseEnrollment'.
  Overload 2 of 2, '(predicate: (value: { id: string; tenantId: string; employeeId: string; createdAt: Date; updatedAt: Date; status: string; learningPathId: string | null; metadata: unknown; startDate: Date | null; ... 10 more ...; rating: number | null; }, index: number, array: { ...; }[]) => unknown, thisArg?: any): { ...; }[]', gave the following error.
    Argument of type '(l: CourseEnrollment) => boolean' is not assignable to parameter of type '(value: { id: string; tenantId: string; employeeId: string; createdAt: Date; updatedAt: Date; status: string; learningPathId: string | null; metadata: unknown; startDate: Date | null; ... 10 more ...; rating: number | null; }, index: number, array: { ...; }[]) => unknown'.
      Types of parameters 'l' and 'value' are incompatible.
        Property 'completedAt' is missing in type '{ id: string; tenantId: string; employeeId: string; createdAt: Date; updatedAt: Date; status: string; learningPathId: string | null; metadata: unknown; startDate: Date | null; feedback: unknown; ... 9 more ...; rating: number | null; }' but required in type 'CourseEnrollment'.
src/routes/employee.ts(58,56): error TS2769: No overload matches this call.
  Overload 1 of 2, '(predicate: (value: { id: string; tenantId: string; employeeId: string; createdAt: Date; updatedAt: Date; status: string; learningPathId: string | null; metadata: unknown; startDate: Date | null; ... 10 more ...; rating: number | null; }, index: number, array: { ...; }[]) => value is { ...; }, thisArg?: any): { ...; }[]', gave the following error.
    Argument of type '(l: CourseEnrollment) => Date | null' is not assignable to parameter of type '(value: { id: string; tenantId: string; employeeId: string; createdAt: Date; updatedAt: Date; status: string; learningPathId: string | null; metadata: unknown; startDate: Date | null; ... 10 more ...; rating: number | null; }, index: number, array: { ...; }[]) => value is { ...; }'.
      Types of parameters 'l' and 'value' are incompatible.
        Property 'completedAt' is missing in type '{ id: string; tenantId: string; employeeId: string; createdAt: Date; updatedAt: Date; status: string; learningPathId: string | null; metadata: unknown; startDate: Date | null; feedback: unknown; ... 9 more ...; rating: number | null; }' but required in type 'CourseEnrollment'.
  Overload 2 of 2, '(predicate: (value: { id: string; tenantId: string; employeeId: string; createdAt: Date; updatedAt: Date; status: string; learningPathId: string | null; metadata: unknown; startDate: Date | null; ... 10 more ...; rating: number | null; }, index: number, array: { ...; }[]) => unknown, thisArg?: any): { ...; }[]', gave the following error.
    Argument of type '(l: CourseEnrollment) => Date | null' is not assignable to parameter of type '(value: { id: string; tenantId: string; employeeId: string; createdAt: Date; updatedAt: Date; status: string; learningPathId: string | null; metadata: unknown; startDate: Date | null; ... 10 more ...; rating: number | null; }, index: number, array: { ...; }[]) => unknown'.
      Types of parameters 'l' and 'value' are incompatible.
        Property 'completedAt' is missing in type '{ id: string; tenantId: string; employeeId: string; createdAt: Date; updatedAt: Date; status: string; learningPathId: string | null; metadata: unknown; startDate: Date | null; feedback: unknown; ... 9 more ...; rating: number | null; }' but required in type 'CourseEnrollment'.
src/routes/export.ts(90,40): error TS2339: Property 'canAchieveStrategy' does not exist on type 'StrategyAlignment'.
src/routes/export.ts(656,29): error TS2339: Property 'hasStrategy' does not exist on type 'StrategyAlignment'.
src/routes/export.ts(662,57): error TS2339: Property 'achievabilityExplanation' does not exist on type 'StrategyAlignment'.
src/routes/export.ts(665,11): error TS18048: 'strategyAlignment.misalignments' is possibly 'undefined'.
src/routes/export.ts(668,13): error TS18048: 'strategyAlignment.misalignments' is possibly 'undefined'.
src/routes/export.ts(680,29): error TS2339: Property 'strengths' does not exist on type 'StrategyAlignment'.
src/routes/export.ts(683,31): error TS2339: Property 'strengths' does not exist on type 'StrategyAlignment'.
src/routes/export.ts(769,19): error TS18048: 'rec.actionItems' is possibly 'undefined'.
src/routes/orchestrator.ts(73,29): error TS2304: Cannot find name 'ArchitectAIResult'.
src/routes/public-structure.ts(76,27): error TS2345: Argument of type '{ name: string; manager: string | null; }' is not assignable to parameter of type 'OrgEmployee'.
  Type '{ name: string; manager: string | null; }' is missing the following properties from type 'OrgEmployee': id, level
src/routes/public-structure.ts(115,7): error TS2322: Type '{ id: string; title: string; department: string; level: number; reportsTo: string | null | undefined; directReports: string[]; }[]' is not assignable to type 'Role[]'.
  Type '{ id: string; title: string; department: string; level: number; reportsTo: string | null | undefined; directReports: string[]; }' is not assignable to type 'Role'.
    Types of property 'reportsTo' are incompatible.
      Type 'string | null | undefined' is not assignable to type 'string | undefined'.
        Type 'null' is not assignable to type 'string | undefined'.
src/routes/public-structure.ts(142,23): error TS2304: Cannot find name 'StructureAnalysisOutput'.
src/routes/skills.ts(654,9): error TS2345: Argument of type '{ industry: string; resumeData?: Record<string, unknown> | undefined; employeeCSV?: Record<string, unknown> | undefined; }' is not assignable to parameter of type 'ClientContext'.
  Property 'tenantId' is missing in type '{ industry: string; resumeData?: Record<string, unknown> | undefined; employeeCSV?: Record<string, unknown> | undefined; }' but required in type 'ClientContext'.
src/services/agents/structure-agent.ts(246,18): error TS18046: 'jsonText.replace' is of type 'unknown'.
src/services/agents/structure-agent.ts(247,35): error TS2345: Argument of type 'string | { [key: string]: unknown; content: string; usage?: { promptTokens?: number | undefined; completionTokens?: number | undefined; totalTokens?: number | undefined; } | undefined; model?: string | undefined; finishReason?: string | undefined; }' is not assignable to parameter of type 'string'.
  Type '{ [key: string]: unknown; content: string; usage?: { promptTokens?: number | undefined; completionTokens?: number | undefined; totalTokens?: number | undefined; } | undefined; model?: string | undefined; finishReason?: string | undefined; }' is not assignable to type 'string'.
src/services/agents/structure-agent.ts(251,38): error TS18046: 'response.narrative.substring' is of type 'unknown'.
src/services/orchestrator/architect-ai.ts(249,46): error TS2345: Argument of type '{ tenantId: string; companyId: string; industry: string; organizationName: string; strategy: string | undefined; employeeData: EmployeeData[]; }' is not assignable to parameter of type 'SkillsAnalysisInput'.
  Types of property 'employeeData' are incompatible.
    Type 'EmployeeData[]' is not assignable to type 'EmployeeSkillData[]'.
      Type 'EmployeeData' is missing the following properties from type 'EmployeeSkillData': employeeId, experience
src/services/orchestrator/architect-ai.ts(308,19): error TS2339: Property 'healthScore' does not exist on type 'StructureAnalysisResult'.
src/services/orchestrator/architect-ai.ts(311,19): error TS2339: Property 'hiringNeeds' does not exist on type 'StructureAnalysisResult'.
src/services/orchestrator/architect-ai.ts(317,17): error TS2339: Property 'alignmentScore' does not exist on type 'CultureAnalysisResult'.
src/services/orchestrator/architect-ai.ts(320,17): error TS2339: Property 'culturalEntropy' does not exist on type 'CultureAnalysisResult'.
src/services/orchestrator/architect-ai.ts(326,16): error TS2551: Property 'coverageScore' does not exist on type 'SkillsAnalysisResult'. Did you mean 'overallScore'?
src/services/orchestrator/architect-ai.ts(329,16): error TS2339: Property 'criticalGaps' does not exist on type 'SkillsAnalysisResult'.
src/services/orchestrator/architect-ai.ts(344,18): error TS2339: Property 'hiringNeeds' does not exist on type 'StructureAnalysisResult'.
src/services/orchestrator/architect-ai.ts(348,16): error TS2339: Property 'interventions' does not exist on type 'CultureAnalysisResult'.
src/services/orchestrator/architect-ai.ts(352,15): error TS2339: Property 'trainingNeeds' does not exist on type 'SkillsAnalysisResult'.
src/services/reports/structure-report.ts(9,13): error TS2304: Cannot find name 'Finding'.
src/services/reports/structure-report.ts(10,20): error TS2304: Cannot find name 'RecommendationItem'.
src/services/reports/structure-report.ts(72,43): error TS2304: Cannot find name 'Finding'.
src/services/reports/structure-report.ts(87,46): error TS2304: Cannot find name 'RecommendationItem'.
src/services/reports/structure-report.ts(116,28): error TS2345: Argument of type 'Record<string, unknown>' is not assignable to parameter of type 'StructureAnalysisResult'.
  Type 'Record<string, unknown>' is missing the following properties from type 'StructureAnalysisResult': id, score, findings, recommendations, createdAt
src/services/reports/structure-report.ts(121,28): error TS2345: Argument of type 'Record<string, unknown>' is not assignable to parameter of type 'StructureAnalysisResult'.
  Type 'Record<string, unknown>' is missing the following properties from type 'StructureAnalysisResult': id, score, findings, recommendations, createdAt
src/services/results/trigger-engine.ts(251,9): error TS2740: Type 'TriggerConfig' is missing the following properties from type 'StructureRecommendation': positionTitle, department, reportingTo, responsibilities, and 2 more.
src/services/social-media/scheduler.ts(90,44): error TS2345: Argument of type '{ id: string; tenantId: string; createdAt: Date; updatedAt: Date; status: string; createdBy: string | null; metadata: unknown; companyId: string; campaignId: string | null; errorMessage: string | null; ... 12 more ...; clicks: number | null; }' is not assignable to parameter of type 'SocialMediaPost'.
  Types of property 'scheduledFor' are incompatible.
    Type 'Date | null' is not assignable to type 'Date'.
      Type 'null' is not assignable to type 'Date'.
src/utils/module-access.ts(132,10): error TS7030: Not all code paths return a value.