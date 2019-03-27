/*
 * Copyright 2019 Mark Adamcin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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