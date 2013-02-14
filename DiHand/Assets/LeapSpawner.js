#pragma strict

import Leap;

public var pointableTip : GameObject;

private var controller : Controller;
private var lastFrame : Frame;

var scaleFactor : float = 0.2;

function Start () {
	controller = new Controller();
	lastFrame = null;
}

function Update () {
	var newFrame : Frame = controller.Frame();
	var pointableControllers;
	var child : PointableController;
	
	if (lastFrame != null) {
		for (var p : Pointable in lastFrame.Pointables) {
			if ( !newFrame.Pointable(p.Id).IsValid ) {
				// We lost p
				pointableControllers = GetComponentsInChildren(PointableController);
				for (var pc in pointableControllers) {
					child = pc as PointableController;
					if (child && child.id == p.Id) {
						Destroy(child.gameObject);
       				}
				}
			}
		}

		for (var p : Pointable in newFrame.Pointables) {
			var pos : Vector3 = Vector3(p.TipPosition.x*scaleFactor,
												(p.TipPosition.y-100)*scaleFactor,
												(-p.TipPosition.z)*scaleFactor);
			var dir : Vector3 = Vector3(p.Direction.x,
										p.Direction.y,
										-p.Direction.z);

			if ( !lastFrame.Pointable(p.Id).IsValid ) {
				// We got p
				var pt : GameObject = Instantiate (pointableTip, pos, Quaternion.identity);
				pt.GetComponent(PointableController).id = p.Id;
				pt.transform.parent = transform;
			} else if (newFrame.Pointable(p.Id).IsValid) {
				pointableControllers = GetComponentsInChildren(PointableController);
				for (var pc in pointableControllers) {
					child = pc as PointableController;
					if (child && child.id == p.Id) {
						child.UpdatePos(pos);
						child.gameObject.transform.rotation = Quaternion.FromToRotation(Vector3.forward, dir);
						if (Input.GetButton ("Fire1")) {
        					var sphere : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
    						sphere.transform.position = pos;
    					}
       				}
				}
			}
		}
	}

	lastFrame = newFrame;
}