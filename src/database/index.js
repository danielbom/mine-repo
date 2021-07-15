const config = require("../config");

const mongoose = require("mongoose");

const ObjectId = { type: mongoose.Types.ObjectId, required: true };
const RequiredString = { type: String, required: true };
const RequiredBoolean = { type: Boolean, required: true };
const RequiredObject = { type: Object, required: true };
const DefaultFalse = { type: Boolean, default: false };

const ProjectSchema = new mongoose.Schema(
  {
    projectName: RequiredString,
    projectOwner: RequiredString,
    data: Object, // Response of github API
    base: Object, // Basic data extracted
    languages: Object, // Response of github API
    pullsCollected: DefaultFalse,
    issuesCollected: DefaultFalse,
    individualPrCollected: DefaultFalse,
    commentsPrCollected: DefaultFalse,
    commentsIssueCollected: DefaultFalse,
    isFollowsCollected: DefaultFalse,
    requestersCollected: DefaultFalse,
    filesCollected: DefaultFalse,
  },
  { timestamps: true }
);

const PullRequestSchema = new mongoose.Schema(
  {
    project: ObjectId,
    data: RequiredObject, // Response of github API
    selfData: Object, // Response of github API
    base: Object, // Basic data extracted
    pullRequestsCount: Number,
    prsCommentsCount: Number,
    issuesCount: Number,
    issueCommentsCount: Number,
    lastIterations: Number,
    filesCollected: DefaultFalse,
    commentsCollected: DefaultFalse,
    individualPrCollected: DefaultFalse,
    isFollowsCollected: DefaultFalse,
    requestersCollected: DefaultFalse,
  },
  { timestamps: true }
);

const IssueSchema = new mongoose.Schema(
  {
    project: ObjectId,
    data: RequiredObject, // Response of github API
    base: Object, // Basic data extracted
    commentsCollected: DefaultFalse,
  },
  { timestamps: true }
);

const IssueCommentSchema = new mongoose.Schema(
  {
    project: ObjectId,
    issue: ObjectId,
    data: RequiredObject, // Response of github API
  },
  { timestamps: true }
);

const PullRequestFileSchema = new mongoose.Schema(
  {
    project: ObjectId,
    pullRequest: ObjectId,
    data: RequiredObject, // Response of github API
    base: Object, // Basic data extracted
  },
  { timestamps: true }
);

const PullRequestCommentSchema = new mongoose.Schema(
  {
    project: ObjectId,
    pullRequest: ObjectId,
    data: RequiredObject, // Response of github API
  },
  { timestamps: true }
);

const FollowCheckSchema = new mongoose.Schema(
  {
    project: ObjectId,
    pullRequest: ObjectId,
    requesterLogin: RequiredString,
    mergerLogin: RequiredString,
    following: RequiredBoolean,
    sameAsMerger: RequiredBoolean,
  },
  { timestamps: true }
);

const PullRequestRequesterSchema = new mongoose.Schema(
  {
    project: ObjectId,
    requesterLogin: RequiredString,
    data: RequiredObject, // Response of github API
  },
  { timestamps: true }
);

const models = {
  followCheck: mongoose.model("FollowCheck", FollowCheckSchema),
  project: mongoose.model("Project", ProjectSchema),
  issue: mongoose.model("Issue", IssueSchema),
  issueComment: mongoose.model("IssueComment", IssueCommentSchema),
  pullRequest: mongoose.model("PullRequest", PullRequestSchema),
  pullRequestFile: mongoose.model("PullRequestFile", PullRequestFileSchema),
  pullRequestComment: mongoose.model(
    "PullRequestComment",
    PullRequestCommentSchema
  ),
  pullRequestRequester: mongoose.model(
    "PullRequestRequester",
    PullRequestRequesterSchema
  ),
};

module.exports = {
  connect() {
    return mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  },
  disconnect() {
    return mongoose.disconnect();
  },
  async clear() {
    const values = Object.values(models);
    await Promise.all(values.map((model) => model.deleteMany({})));
  },
  models,
  toId(id) {
    return mongoose.Types.ObjectId(id);
  },
};
