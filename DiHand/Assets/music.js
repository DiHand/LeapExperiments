#pragma strict

var impact : AudioClip;

function OnCollisionEnter () {
    audio.PlayOneShot(impact, 1);
}