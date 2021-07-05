const mongoose = require("mongoose");

const ObjectId = { type: mongoose.Types.ObjectId, required: true };
const RequiredString = { type: String, required: true };
const RequiredBoolean = { type: Boolean, required: true };

const ProjectSchema = new mongoose.Schema(
  {
    projectName: RequiredString,
    projectOwner: RequiredString,
    data: Object, // Response of github API
    base: Object, // Basic data extracted
    pullsCollected: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const PullRequestSchema = new mongoose.Schema(
  {
    project: ObjectId,
    data: Object, // Response of github API
    selfData: Object, // Response of github API
    base: Object, // Basic data extracted
    filesCollected: { type: Boolean, default: false },
    individualPrCollected: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const PullRequestFileSchema = new mongoose.Schema(
  {
    project: ObjectId,
    pullRequest: ObjectId,
    data: Object, // Response of github API
    base: Object, // Basic data extracted
  },
  { timestamps: true }
);

const FollowCheckSchema = new mongoose.Schema(
  {
    requesterLogin: RequiredString,
    mergerLogin: RequiredString,
    following: RequiredBoolean,
    sameAsMerger: RequiredBoolean,
  },
  { timestamps: true }
);

module.exports = {
  connect() {
    const uri = "mongodb://localhost:27017/repo-mine";
    return mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  },
  disconnect() {
    return mongoose.disconnect();
  },
  models: {
    followCheck: mongoose.model("FollowCheck", FollowCheckSchema),
    project: mongoose.model("Project", ProjectSchema),
    pullRequest: mongoose.model("PullRequest", PullRequestSchema),
    pullRequestFile: mongoose.model("PullRequestFile", PullRequestFileSchema),
  },
  toId(id) {
    return mongoose.Types.ObjectId(id);
  },
};
