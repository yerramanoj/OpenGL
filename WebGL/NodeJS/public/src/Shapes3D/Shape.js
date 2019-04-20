
class Shape
{
	constructor(id)
	{
		this.NONE = 0;
		this.BOX = 1;
		this.CONE = 2;
		this.CYLINDER = 3;
		this.SPHERE = 4;
		this.MESH = 5;

		this._id = id;
		this.m = Array(16).fill(0);
		this.m[0] = this.m[5] = this.m[10] = this.m[15] = 1.0;
		this._color = Array(4).fill(255);
		this._randomColorAlpha = 255;
		this._visible = true;
		this._useRandomColors = true;
	}

	GetID()
	{
		return this._id;
	}

	SetRandomColorAlpha(alpha)
	{
		this._randomColorAlpha = alpha;
	}

	SetUseRandomColors(useRandomColors)
	{
		this._useRandomColors = useRandomColors;
	}

	IsUsingRandomColors()
	{
		return this._useRandomColors;
	}

	SetGLMatrix(mat)
	{
		for(var i=0; i<16; i++)
		{
			this.m[i] = mat[i];
		}
	}

	GetGLMatrix()
	{
		return this.m;
	}

	SetPos(x, y, z)
	{
		this.m[12] = x;
		this.m[13] = y;
		this.m[14] = z;
	}

	SetPos(pos)
	{
		this.m[12] = pos.x;
		this.m[13] = pos.y;
		this.m[14] = pos.z;
	}

	GetPos()
	{
		return new CVector3(this.m[12], this.m[13], this.m[14]);
	}

	AddTransInWorld(x, y, z)
	{
		this.m[12] += x;
		this.m[13] += y;
		this.m[14] += z;
	}

	//AddRotateInWorld(char axis, float angle)
	AddRotateInWorld(axis, angle)
	{
		var newRot = new GLMat();
		
		if(axis === 'x' || axis === 'X')	newRot.glRotatef(angle, 1,0,0);
		if(axis === 'y' || axis === 'Y')	newRot.glRotatef(angle, 0,1,0);
		if(axis === 'z' || axis === 'Z')	newRot.glRotatef(angle, 0,0,1);

		newRot.glMultMatrixf( this.m );

		for(var i=0; i<16; i++) {
			this.m[i] = newRot.m[i];
		}
	}

	//AddTransInLocal(char axis, float move)
	AddTransInLocal(axis, move)
	{
		var vec;

		if(axis == 'x')			vec = new CVector3( this.m[0], this.m[1], this.m[2] );
		else if(axis == 'y')	vec = new CVector3( this.m[4], this.m[5], this.m[6] );
		else if(axis == 'z')	vec = new CVector3( this.m[8], this.m[9], this.m[10] );
		
		vec.Normalize();
		vec *= move;

		this.m[12] += vec.x;
		this.m[13] += vec.y;
		this.m[14] += vec.z;
	}

	//AddRotateInLocal(char axis, float angle)
	AddRotateInLocal(axis, angle)
	{
		var rotMat = new GLMat();
		
		if(axis == 'x' || axis == 'X')	rotMat.glRotatef(angle, 1,0,0);
		if(axis == 'y' || axis == 'Y')	rotMat.glRotatef(angle, 0,1,0);
		if(axis == 'z' || axis == 'Z')	rotMat.glRotatef(angle, 0,0,1);

		var mat = new GLMat();
		mat.Copy(this.m);

		mat.glMultMatrixf(rotMat.Get());

		for(var i=0; i<16; i++) {
			this.m[i] = mat.m[i];
		}
	}

	/*
	void Shape::AddUniformScale(float scale)
	{
		if(_id == CYLINDER)
		{
			Cylinder* cylinder = (Cylinder*)this;
			cylinder->SetRadius( cylinder->GetRadius() * scale );
			cylinder->SetHeight( cylinder->GetHeight() * scale );
		}
		else if(_id == SPHERE)
		{
			Sphere* sphere = (Sphere*)this;
			sphere->SetRadius( sphere->GetRadius() * scale );
		}
		else if(_id == CONE)
		{
			Cone* cone = (Cone*)this;
			cone->SetRadius( cone->GetRadius() * scale );
			cone->SetHeight( cone->GetHeight() * scale );
		}
		else if(_id == BOX)
		{
			Box* box = (Box*)this;
			
			CVector3 size = box->GetSize();

			box->SetSize( size.x * scale, size.y * scale, size.z * scale );
		}
	}

	void Shape::AddScale(CVector3 scale)
	{
		if(_id == CYLINDER)
		{
			Cylinder* cylinder = (Cylinder*)this;
			cylinder->SetRadius( cylinder->GetRadius() + scale.x + scale.z );
			cylinder->SetHeight( cylinder->GetHeight() + scale.y*2.0f );
		}
		else if(_id == SPHERE)
		{
			Sphere* sphere = (Sphere*)this;
			sphere->SetRadius( sphere->GetRadius() + scale.x + scale.y + scale.z );
		}
		else if(_id == CONE)
		{
			Cone* cone = (Cone*)this;
			cone->SetRadius( cone->GetRadius() + scale.x + scale.z );
			cone->SetHeight( cone->GetHeight() + scale.y*2.0f );
		}
		else if(_id == BOX)
		{
			Box* box = (Box*)this;
			CVector3 size = box->GetSize();
			box->SetSize( size.x + scale.x*2.0f, size.y + scale.y*2.0f, size.z + scale.z*2.0f );
		}
	}
	*/

	SetColor(r, g, b, a)
	{
		this._color[0] = r;
		this._color[1] = g;
		this._color[2] = b;
		this._color[3] = a;
	}

	// void Shape::SetColor(unsigned int c)
	// {
		// _color[0] = (c >> 24) & 255;
		// _color[1] = (c >> 16) & 255;
		// _color[2] = (c >> 8) & 255;
		// _color[3] = (c) & 255;
	// }

	SetVisible(visible)
	{
		this._visible = visible;
	}

	IsVisible()
	{
		return this._visible;
	}

	/*
	Shape* Shape::GetBestFitBoundingShape(float* vertexBuf, int arrSize)
	{
		Box boxShape			= Box::CalcBoundingBox(vertexBuf, arrSize);
		Cone coneShape			= Cone::CalcBoundingCone(vertexBuf, arrSize);
		Cylinder cylinderShape	= Cylinder::CalcBoundingCylinder(vertexBuf, arrSize);
		Sphere sphereShape		= Sphere::CalcBoundingSphere(vertexBuf, arrSize);

		Shape* shape1 = new Box( &boxShape );
		Shape* shape2 = new Cone( &coneShape );
		Shape* shape3 = new Cylinder( &cylinderShape );
		Shape* shape4 = new Sphere( &sphereShape );

		float volume1 = shape1->Volume();
		float volume2 = shape2->Volume();
		float volume3 = shape3->Volume();
		float volume4 = shape4->Volume();

		Shape* returnShape = NULL;

		if(volume1 <= volume2 && volume1 <= volume3 && volume1 <= volume4)			returnShape = shape1;
		else if(volume2 <= volume1 && volume2 <= volume3 && volume2 <= volume4)		returnShape = shape2;
		else if(volume3 <= volume1 && volume3 <= volume2 && volume3 <= volume4)		returnShape = shape3;
		else																		returnShape = shape4;

		if(returnShape != shape1) { delete shape1; shape1 = NULL; }
		if(returnShape != shape2) { delete shape2; shape2 = NULL; }
		if(returnShape != shape3) { delete shape3; shape3 = NULL; }
		if(returnShape != shape4) { delete shape4; shape4 = NULL; }

		return returnShape;
	}

	Shape* Shape::GetBoundingShape(float* vertexBuf, int arrSize, int boundingShapeID)
	{
		Shape* shape = NULL;

		if(boundingShapeID == BOX)		shape = new Box		( &(Box::CalcBoundingBox(vertexBuf, arrSize)) );
		//if(boundingShapeID == CONE)		shape = new Cone	( &(Cone::CalcBoundingCone(vertexBuf, arrSize)) );
		//if(boundingShapeID == CYLINDER)	shape = new Cylinder( &(Cylinder::CalcBoundingCylinder(vertexBuf, arrSize)) );
		//if(boundingShapeID == SPHERE)	shape = new Sphere	( &(Sphere::CalcBoundingSphere(vertexBuf, arrSize)) );

		return shape;
	}
	*/
}