---
title: "浅谈NSString copy与strong的区别"
date: 2016-01-12T14:10:54+08:00
draft: false
---

> 最近在看面试题，刚好遇到`copy`用法的问题。而我对答案不是很理解，所以晚上搜了一些相关知识，然后自己手动试了下。

# 先贴下面试题及答案
---
## 题目：怎么使用`copy`关键字

回答：`NSString、NSArray、NSDictionary` 等等经常使用`copy`关键字，是因为他们有对应的可变类型：`NSMutableString、NSMutableArray、NSMutableDictionary`

对此不是很理解，所以就找了下`copy`的解释。

Copy

copy is required when the object is mutable. Use this if you need the value of the object as it is at this moment, and you don't want that value to reflect any changes made by other owners of the object. You will need to release the object when you are finished with it because you are retaining the copy.

大概意思是不想本类的属性随外面的变化而变化时使用。

# Talk is cheap,show me the code.
---
首先先创建两个`NSString`的属性，一个为`copy`，一个为`strong`。

{% highlight objc %}
@property (nonatomic, copy) NSString *strCopy;

@property (nonatomic, strong) NSString *strStrong;

{% endhighlight %}

然后创建一个`NSString`对象，将其赋值给这两个属性，并打印出变量值和地址。修改`NSString`，再打印出两个属性的值和地址。

{% highlight objc %}
NSString *strChange = [NSString stringWithFormat:@"hello"];
self.strCopy = strChange;
self.strStrong = strChange;
NSLog(@"Before change~~~");
NSLog(@"Copy string: %@ ,%p;", self.strCopy, self.strCopy);
NSLog(@"Strong string: %@, %p;", self.strStrong, self.strStrong);
NSLog(@"Change string: %@, %p;", strChange, strChange);

strChange = @"world";
NSLog(@"After change~~~");
NSLog(@"Copy string: %@ ,%p;", self.strCopy, self.strCopy);
NSLog(@"Strong string: %@, %p;", self.strStrong, self.strStrong);
NSLog(@"Change string: %@, %p;", strChange, strChange);
{% endhighlight %}

结果如下

![result](http://cl.ly/2g061W2K0P04/Image%202016-01-12%20at%204.06.49%20%E4%B8%8B%E5%8D%88.png)

可见，**当赋值类型是不可变的`NSString`时，不管是`copy`还是`strong`，都是将其指针直接赋值过去。**`NSString`发生变化，其指针会发生变化，不会对属性造成影响。

将`strChange`的类型改为`NSMutableString`，然后对其修改。

{% highlight objc %}
NSMutableString *strChange = [NSMutableString stringWithFormat:@"hello"];
self.strCopy = strChange;
self.strStrong = strChange;
NSLog(@"Before change~~~");
NSLog(@"Copy string: %@ ,%p;", self.strCopy, self.strCopy);
NSLog(@"Strong string: %@, %p;", self.strStrong, self.strStrong);
NSLog(@"Change string: %@, %p;", strChange, strChange);

[strChange insertString:@"world" atIndex:4];
NSLog(@"After change~~~");
NSLog(@"Copy string: %@ ,%p;", self.strCopy, self.strCopy);
NSLog(@"Strong string: %@, %p;", self.strStrong, self.strStrong);
NSLog(@"Change string: %@, %p;", strChange, strChange);
{% endhighlight %}

结果如下：

![mutable result](http://cl.ly/020Z312W233b/Image%202016-01-12%20at%205.08.18%20%E4%B8%8B%E5%8D%88.png)

可见，**当赋值类型是可变的`NSMutableString`时`copy`会将`changeStr`重新拷贝一份并将新的指针赋值给属性。而`strong`则还是直接将`changeStr`的指针赋值过去。**所以当我们对`changeStr`进行改变时，`copy`属性不会受到影响，`strong`类型则会跟着改变。

# 结论
---
**当属性是`NSString,NSArray,NSDictionary`这种不可变的类型时，我们一般不希望它随着外界变化而变化，所以最好使用`copy`。**
