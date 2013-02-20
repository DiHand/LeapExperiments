#pragma strict

private var touchDict : Hashtable;

function Start () {
	touchDict = new Hashtable();
}

function Update () {
	var avgPos = new Vector3(0,0,0);
	var touchCount : int = touchDict.Count;
	for(var idx in touchDict.Keys) {
		var curr:Vector3 = touchDict[idx];
		avgPos += curr;

	}
	if (touchCount > 1) {
		transform.position = avgPos/touchCount;
	}
}

function OnCollisionStay (collisionInfo : Collision) {
	var i : int = collisionInfo.rigidbody.gameObject.GetInstanceID(); 
	if (touchDict.Contains(i)) {
		touchDict[i] = collisionInfo.rigidbody.gameObject.transform.position;	
	}
}

function OnCollisionEnter (collisionInfo : Collision) {
	touchDict.Add(collisionInfo.rigidbody.gameObject.GetInstanceID(), collisionInfo.rigidbody.gameObject.transform.position);
}

function OnCollisionExit (collisionInfo : Collision) {
	var i : int = collisionInfo.rigidbody.gameObject.GetInstanceID(); 
	if (touchDict.Contains(i)) {
		touchDict.Remove(i);	
	}
}