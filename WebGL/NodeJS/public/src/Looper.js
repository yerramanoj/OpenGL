
class Looper
{
	constructor()
	{
	}
	
	async init(sw, sh)
	{
		this._sw = sw;
		this._sh = sh;
		
		cam3D.init(sw, sh, 1.0, 10000.0, 0.2);
		cam2D.init(sw, sh);
		
		this.floor = new Floor();
		await this.floor.init();
		
		await this.load3DPrimitives();
		
		this.objModel = new ObjLoader();
		await this.objModel.init("./data/cottage");
		
		this.texture = new GLTexture();
		await this.texture.init('./data/Sample.png', true);
		//this.texture.setBounds(100,200,sw,sh);
		//this.texture.setBounds(1,2,5,2);
		
		this.fbo = new GLFBO(sw, sh);		
	}
	
	async load3DPrimitives()
	{
		this.box = new Box();
		await this.box.initWithPosAndSize(0,0,0, 2,3,4);
		this.box.setSize(3, 1, 6);
		this.box.setPos(-10, 0, -10);
		
		this.cone = new Cone();
		await this.cone.initWithPosAndSize(0, 0, 0, 2, 3);
		this.cone.setRadius(1.5);
		this.cone.setHeight(2);
		this.cone.setPos(-5, 0, -10);
		
		this.cylinder = new Cylinder(0, 0, 0, 3, 2);
		await this.cylinder.initWithPosAndSize();
		this.cylinder.setRadius(1.5);
		this.cylinder.setHeight(2);
		this.cylinder.setPos(0, 0, -10);
		
		this.sphere = new Sphere();
		await this.sphere.initWithPosAndSize(0, 0, 0, 2);
		this.sphere.setPos(5, 0, 0);
		this.sphere.setRadius(5);
		
		this.rect = new Rect();
		await this.rect.init(100, 100, 200, 300);

		this.triangle = new Triangle();
		await this.triangle.init(new CVector3(100,100,0), new CVector3(200,200,0), new CVector3(50,200,0));
		this.triangle.setColor4ub(0, 128, 0, 255);		
	}
		
	draw()
	{
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.DEPTH_TEST);
		
		gl.viewport(0, 0, this._sw, this._sh);
		this.fbo.bind();
		
		gl.clearColor(0.2, 0.2, 0.2, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		cam3D.updateCamera();
		
		this.texture.setBounds(1,2,5,2);
		this.texture.draw(cam3D.projMat.m, cam3D.modelMat.m);
		
		this.floor.draw();
		//this.objModel.draw();
		
		this.box.draw();
		this.cone.draw();
		this.cylinder.draw();
		this.sphere.draw();

		this.fbo.unBind();

		gl.clearColor(0.2, 0.2, 0.2, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.disable(gl.DEPTH_TEST);
		
		this.texture.setBounds(10,10, this._sw*0.9, this._sh*0.9);
		this.texture.drawWithTextureID(this.fbo.getTextureID(), cam2D.projMat.m, cam2D.modelMat.m);
		
		this.rect.draw();
		this.triangle.draw();
	}
}


















