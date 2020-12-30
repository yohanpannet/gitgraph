import { createGitgraph, TemplateName, templateExtend, Orientation } from "@gitgraph/js";

// Get the graph container HTML element.
const graphContainer = document.getElementById("graph-container");

// Instantiate the graph.
const template = templateExtend(TemplateName.Metro, {
    commit: {
        message: {
            displayHash: false,
            displayAuthor: false
        }
    }
})

const options = {
    orientation: Orientation.VerticalReverse,
    template: template
}
const gitgraph = createGitgraph(graphContainer, options);

// Simulate git commands with Gitgraph API.
const master = gitgraph.branch("master");
master.commit("Initial commit");
const release = master.branch("release");

const develop = gitgraph.branch("develop");
develop.commit("Unwanted commit in dev");

const aFeature = gitgraph.branch("feat1");
aFeature
    .commit("feat1: Make it work")
    .commit("Make it right")

develop.merge(aFeature, "merge for dev test");
//develop.commit("Prepare v1");

release.merge(aFeature).tag("v1.0.0");
master.merge(release);