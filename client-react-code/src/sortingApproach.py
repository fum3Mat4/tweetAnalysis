


def sorted(function):
	def verify(*args,**kwargs):
		if len(args)==1:		
			anArr=args;
			newArr= partition(anArr[0],0,len(anArr[0]))
			return function(*args, **kwargs);
		else:
			return print("Error")
			
	def partition(anArr,s,e):
		pivot=anArr[s];
		pivotX=s;
		for j,x in enumerate(anArr[s:e]):
			i=j+s
			if anArr[i]<pivot:
				aux=anArr[i];
				anArr[i]=anArr[pivotX];
				anArr[pivotX]=aux
				pivotX+=1
		if pivotX>s:
			pivotX-=1
		aux=anArr[pivotX];
		anArr[pivotX]=pivot;
		anArr[s]=aux;
		if 	s<pivotX:
			partition(anArr,s,pivotX);
		if (pivotX+1)<e:
			partition(anArr,pivotX+1,e);
		
		return anArr
		
	return verify
	
	
@sorted
def findInArr(anArr):
	print(anArr)
	
	
findInArr([4,57,99,9,45,3,7,1,10,2,16,8,91,1])