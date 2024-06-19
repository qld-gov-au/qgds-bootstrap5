## cdnDeploy script Explanation

### Job deployDEV:

Triggers on push to main, develop, and on tags matching v*
Contains all the steps you initially provided.

### Job deployTEST:

Depends on deployDEV using the needs keyword.
Runs only if the branch is develop or main. 
Uses the same steps as deployDEV.

### Job deploySTAGING:

Triggers on tags matching v* a tag is pushed.
Uses the same steps as deployDEV.

### Job deployBETA:

Depends on deploySTAGING.
Triggers on tags matching v*
Uses the same steps as deployDEV.

### Job deployPROD:

Depends on deploySTAGING.
Triggers on tags matching v* but requires manual approval (workflow_dispatch with an input).
Uses the same steps as deployDEV.