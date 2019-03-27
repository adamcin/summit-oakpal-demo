/**
 * Notified when package importer adds, modifies, or leaves a node untouched.
 *
 * @param packageId         the current package
 * @param path              the imported path
 * @param node              the imported JCR node
 */
function importedPath(packageId /* PackageId */, path /* String */, node /* Node */) {
    if (path.startsWith("/apps/") && node.getName() === "config" && isComponent(node)) {
        oakpal.majorViolation(path + ": avoid naming dialog nodes 'config'", packageId);
    }
}

function isComponent(node) {
    return node.isNodeType("cq:Component") || (node.getDepth() > 0 && isComponent(node.getParent()));
}