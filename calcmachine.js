var oper1,oper2,opt;
var mem;
var state,memclear=true;

function fclear()
{
 state=0;
 oper1=0;oper2=0;
 txtin.value=""+oper1;
 if(memclear) {mem=0;memclear=false;}
}

function fmachine(intype,v)
{
 switch(state)
 {
  case 0:
	switch(intype)
	{
	 case '=':
	 case 'opt':
	 case 'uopt':
		state=0;
	 break;
	 case 'oper':
		txtin.value=""+v;
		state=1;
		fvalidate();
	 break;
	}
  break;
  case 1:
	switch(intype)
	{
	 case 'oper':
		txtin.value+=v;
		fvalidate();
	 break;
	 case 'opt':
		opt=v;
		oper1=parseFloat(txtin.value);
		state=2;
	 break;
	 case 'uopt':
		funaryopt(v);
		//state=5;
	 break;
	 case '=':
		state=0;
	 break;
	}
  break;
  case 2:
	switch(intype)
	{
	 case 'opt':
		opt=v;
		oper1=parseFloat(txtin.value);
	 break;
	 case 'oper':
		oper1=parseFloat(txtin.value);
		txtin.value=""+v;
		state=3;
		fvalidate();
	 break;
	 case 'uopt':
		funaryopt(v);
		//state=5;
	 break;
	 case '=':
		oper1=parseFloat(txtin.value);
		oper2=oper1;
		state=4;
	 break;
	}
  break;
  case 3:
	switch(intype)
	{
	 case 'oper':
		txtin.value+=v;
		fvalidate();
	 break;
	 case 'opt':
		oper2=parseFloat(txtin.value);
		feval();
		txtin.value=""+oper1;
		opt=v;
		state=2;
	 break;
	 case 'uopt':
		funaryopt(v);
		//state=5;
	 break;
	 case '=':
		oper2=parseFloat(txtin.value);
		feval();
		txtin.value=""+oper1;
		state=4;
	 break;
	}
  break;
  case 4:
	switch(intype)
	{
	 case '=':
		feval();
		txtin.value=""+oper1;
	 break;
	 case 'opt':
		opt=v;
		state=2;
	 break;
	 case 'oper':
		txtin.value=""+v;
		state=1;
		fvalidate();
	 break;
	 case 'uopt':
		funaryopt(v);
		//state=5;
	 break;
	}
  break;
  case 5:
	switch(intype)
	{
	 case 'uopt':
		funaryopt(v);
	 break;
	 case 'oper':
		txtin.value=""+v;
		state=1;
		fvalidate();
	 break;
	 case 'opt':
		opt=v;
		state=2;
	 break;
	 case '=':
	 break;
	}
  break;
 }
 //fvalidate();
 status=""+state;
}

function feval()
{
 switch(opt)
 {
  case '+':
	oper1+=oper2;
  break;
  case '-':
	oper1-=oper2;
  break;
  case '*':
	oper1*=oper2;
  break;
  case '/':
	oper1/=oper2;
  break;
  case '%':
	oper1%=oper2;
  break;
  case '^':
	oper1=Math.pow(oper1,oper2);
  break;
  default:
 }
}

function funaryopt(vopt)
{
 opert=parseFloat(txtin.value);
 switch(vopt)
 { 
  case 'sqrt':
	opert=Math.sqrt(opert);
  break;
  case 'sin':
	opert=Math.sin(opert);
  break;
  case 'cos':
	opert=Math.cos(opert);
  break;
  case 'tan':
	opert=Math.tan(opert);
  break;
  case 'pm':
	opert=opert*-1;
  break;
  case 'E':
	opert=Math.exp(opert);
  break;
 }
 txtin.value=""+opert;
}

function fmem(act)
{
 switch(act)
 {
  case 'c':mem=0;
  break;
  case 'r':txtin.value=""+mem;
  break;
  case '+':mem+=parseFloat(txtin.value);
  break;
  case '-':mem-=parseFloat(txtin.value);
  break;
  case 'pop':alert("Memory = "+mem);
  break;
 }
 fvalidate();
}

function fvalidate()
{
 var str = txtin.value;
 var len = str.length;
 var dot = str.indexOf('.');
 if(len>0)
 {
   for(i=len-1;i>=0;i--)
   {
     var c=str.charAt(i);
     if((c<'0' || c>'9') && c!='.' && c!='-') str=str.substring(0,i);
     if(c=='.' && i!=dot) str=str.substring(0,i);
     if(c=='-' && i!=0) str=str.substring(0,i);
   }
 }
 txtin.value=str;
 if(str.length>0 && parseFloat(str)!=0) 
 {
	switch(state)
	{
		case 0: state=1;break;
		case 2:	state=3;break;
		case 4:	state=1;break;
		case 5:	state=1;break;
	}
 }
 status=""+state
}