

var array = [];
var whiteMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
var scene = new THREE.Scene();
var timer = 0;
var index = -40;

$(function()
{
	
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 500);
	var renderer = new THREE.WebGLRenderer();

	camera.position.z = 10;
	camera.rotation.z = 90;

	renderer.setClearColor(0xd9d9d9);
	renderer.setSize(window.innerWidth, window.innerHeight);


	render();
	function render()
	{

		timer += 1;
		if (timer >= 1 && index < 40)
		{
			index++;
			AddNode(index);
			timer = 0;
		}


		array.forEach(function(item, i, arr) 
		{
			item.render();
			item.group.rotation.x += .01;
		});

		requestAnimationFrame(render);

		camera.aspect = window.innerWidth / window.innerHeight;
    	camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );

		renderer.render(scene, camera);

	}

	$("#webGL-container").append(renderer.domElement);
});


function AddNode(i)
{
	var node = new Node(whiteMaterial);

	node.group.position.x = i/4;
	node.group.rotation.x = 0 + i/8;
	scene.add(node.group);

	array.push(node);
}


function Node(material)
{
	var sphere01 = AddSphere(material, 0, 3, 0);
	var sphere02 = AddSphere(material, 0, -3, 0);
	var line = DrawLine(material, sphere01.position, sphere02.position);
	this.group = new THREE.Object3D();

	this.group.add(sphere01);
	this.group.add(sphere02);
	this.group.add(line);

	this.render = function()
	{
		line.geometry.vertices[0] = sphere01.position;
		line.geometry.vertices[1] = sphere02.position;
		line.geometry.verticesNeedUpdate = true;
	};
}


function AddSphere(material, x, y, z)
{
	var geometry   = new THREE.SphereGeometry(0.1, 32, 32);
	var sphere = new THREE.Mesh(geometry, material);

	sphere.position.x = x;
	sphere.position.y = y;
	sphere.position.z = z;

	return sphere;
}


function DrawLine(material, position01, position02)
{
	var geometry = new THREE.Geometry();

    geometry.vertices.push(position01);
    geometry.vertices.push(position02);

    var line = new THREE.Line(geometry, material);

    return line;
}