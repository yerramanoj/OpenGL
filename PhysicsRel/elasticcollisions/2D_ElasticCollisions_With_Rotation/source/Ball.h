#ifndef BALL_H
#define BALL_H
#pragma once

#include "MathLib/Point.h"
#include "MathLib/MyVector.h"
#include "CommonLib/Sprite.h"

class Ball
{
private:
	float _cx;
	float _cy;
	float _r;
	
	MyVector* _velocityVec;
	float _mass;
	float _angle;
	float _angularVel;

	bool _rotColckWise;

	Sprite* _sprite;

public:
	Ball(float centerX, float centerY, float radius);

	void SetCenter(float cx, float cy);
	void SetMass(float mass);

	//void SetSpeed(float speed);
	//void SetDirection(Point* p);

	float GetMass();
	float GetCX();
	float GetCY();
	float GetR();
	void SetR(float r);

	void Move();
	void UndoMove();

	MyVector* GetVelocityVec();

	float GetXVelocity();
	float GetYVelocity();
	void SetVelocity(float xVelocity, float yVelocity);
	float GetSpeed();

	void Update();

	void SetRotation(float angle);
	void SetRotClockWise(bool clockWise);
	bool IsRotClockWise();

	void SetRotSpeedPercent(float speedPercent);
	//void SetRotSpeed(float rotSpeed);
	//float GetRotSpeed();

	void ReverseRot();

	void Draw();
};

#endif