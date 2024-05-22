const path = require('path');

module.exports = {
  // Function to resolve the storage path of snapshots
  resolveSnapshotPath: (testPath, snapshotExtension) =>
  testPath.replace(/\/tests\//, '/results/snapshots/') + snapshotExtension,
  // Function to resolve the test file path from the snapshot file
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath.replace('__snapshots__', '').slice(0, -snapshotExtension.length),
  testPathForConsistencyCheck: 'some/example.test.js'  // Path for Jest's internal consistency check
};