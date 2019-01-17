#include "SuiCheckBox.h"
#include "SuiIncludes.h"
#include "SuiFont.h"
#include "SuiInput.h"
#include <math.h>

SuiCheckBox::SuiCheckBox(string name, int nameAlignment) : SuiComponent(SuiComponent::CHECKBOX)
{
	_name = name;
	_nameAlignment = nameAlignment;

	_boxType = BOX_SQUARE;
	_isSelected = false;

	_h = 22;

	//_isBgVisible = true;
	_isBorderVisible = true;

	_bgR = 171;
	_bgG = 171;
	_bgB = 171;
	_bgA = 255;

	_borderR = 57;
	_borderG = 57;
	_borderB = 57;
	_borderA = 255;

	_actionListener = NULL;
	_mouseListener = NULL;
}

SuiCheckBox::~SuiCheckBox()
{
	int a = 10;
}

void SuiCheckBox::Move(float dx, float dy)
{
	_x += dx;
	_y += dy;
}

void SuiCheckBox::ResetBounds()
{
}

bool SuiCheckBox::IsSelected()
{
	return _isSelected;
}

void SuiCheckBox::SetSelect(bool select)
{
	_isSelected = select;
}

void SuiCheckBox::SetBoxType(int boxType)
{
	_boxType = boxType;
}

void SuiCheckBox::Draw()
{
	if(_isBgVisible)
		DrawBackground();

	if(_x+_h < _x+_w)
	{
		if(_boxType == BOX_SQUARE)
			DrawRect(_x,_y,_h,_h);
		else if(_boxType == BOX_CIRCLE)
			DrawCircle((float)((int)(_x+_h/2)), (float)((int)(_y+_h/2.0f)), (float)((int)(_h/2.0f)));
	}

	_x += _h;
	_w -= _h;

	SuiFont::GetInstance()->SetColor(0xffffffff);
	SuiFont::GetInstance()->Begin();

	SuiFont::GetInstance()->HorBorder(_x, _x+_w);

	float fontHorGap = -0.5;
	float fontSize = SuiFont::GetInstance()->GetFontSize();

	if(_nameAlignment == LEFT)			SuiFont::GetInstance()->DrawFromLeft(_name, _x, _y+_h/2, fontSize);
	else if(_nameAlignment == RIGHT)	SuiFont::GetInstance()->DrawFromRight(_name, _x+_w, _y+_h/2, fontSize);
	else								SuiFont::GetInstance()->DrawFromCenter(_name, _x+_w/2, _y+_h/2, fontSize);

	SuiFont::GetInstance()->End();

	_x -= _h;
	_w += _h;

	if(_isBorderVisible)
		DrawBorder();
}

void SuiCheckBox::DrawRect(float x, float y, float w, float h)
{
	float horMargin = 3.0f;
	float verMargin = 3.0f;
	
	x += horMargin;
	w -= horMargin*2;
	y += verMargin;
	h -= verMargin*2;

	glColor4ub(66, 66, 66, 255);

	glBegin(GL_TRIANGLE_STRIP);
	glVertex2f(x,	y);
	glVertex2f(x+w, y);
	glVertex2f(x,	y+h);
	glVertex2f(x+w, y+h);
	glEnd();

	if(_isSelected)
	{
		glLineWidth(2.0f);
		glColor4ub(255, 255, 255, 255);
		glBegin(GL_LINE_STRIP);
		glVertex2f(x+1, y+h/2);
		glVertex2f(x+w/2-3, y+h-4);
		glVertex2f(x+w-2, y+3);
		glEnd();
	}
}

void SuiCheckBox::DrawCircle(float cx, float cy, float r)
{
	float horMargin = 5.0f;
	float verMargin = 3.0f;

	if(horMargin > verMargin)
		r -= horMargin;
	else
		r -= verMargin;

	glColor4ub(66, 66, 66, 255);
	glBegin(GL_TRIANGLE_FAN);
	glVertex3f(cx, cy, 0);
	glVertex3f(cx+r, cy, 0);

	for( int angle=0; angle<=360; angle += 10)
	{
		float radians = angle*(22.0f/7.0f)/180.0f;
		float x = cx+r*cosf(radians);
		float y = cy+r*sinf(radians);
		glVertex3f(x,y,0);
	}
	glVertex3f(cx+r, cy, 0);
	glEnd();

	if(_isSelected)
	{
		r /= 1.7f;

		glColor4ub(200, 200, 200, 255);
		glBegin(GL_TRIANGLE_FAN);
		glVertex3f(cx, cy, 0);
		glVertex3f(cx+r, cy, 0);

		for( int angle=0; angle<=360; angle += 10)
		{
			float radians = angle*(22.0f/7.0f)/180.0f;
			float x = cx+r*cosf(radians);
			float y = cy+r*sinf(radians);
			glVertex3f(x,y,0);
		}
		glVertex3f(cx+r, cy, 0);
		glEnd();
	}
}

SuiEvents SuiCheckBox::UpdateByInput()
{
	SuiEvents eventsVec;

	if(!Contains((float)SuiInput::MX, (float)SuiInput::MY))
		return eventsVec;

	if(SuiInput::IsMouseClicked())
	{
		SetSelect(!IsSelected());

		if(_actionListener)
			eventsVec.ACTION_PERFORMED = true;
	}

	return eventsVec;
}