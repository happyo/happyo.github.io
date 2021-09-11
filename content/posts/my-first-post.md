---
title: "My First Post"
date: 2021-09-10T22:45:58+08:00
draft: false
---
函数式编程（functional programming）是一种编程范式，它将电脑运算视为数学上的函数计算，并且避免使用程序状态以及易变对象。函数编程语言最重要的基础是λ演算（lambda calculus）。

函数式编程有一下几个概念

#### 函数是“一等公民”（first-class）

First-class function 指的是函数可以存储在变量或者其他数据结构中；可以被当作参数传入其他函数；可以被当作函数的返回值。在面向对象编程中，对象（object）就是“一等公民”，可以把函数式编程中的函数类比成面向对象编程中的对象。

#### 纯函数（pure functions）

纯函数没有“副作用”（side effect），意思是函数不会影响到外界的状态，例如修改变量等等。这就带来了一些特有的好处：

- 在代码中，如果一个纯函数不再使用了，那么可以直接删除掉，完全不会影响到其他逻辑。
- 在调用纯函数时，如果参数不变，那么返回结果也不会变。
- 因为在两个纯函数之间没有数据依赖，所以纯函数是天然线程安全的（thread-safe），并且可以并行计算。
- 如果整个语言都没有“副作用”，那么就可以使用任意的求值策略，比如haskell中的惰性求值（lazy evaluation）。

#### 高阶函数（higher-order function）

高阶函数是接受一个或多个函数作为输入或者输出一个函数的函数，常见的高阶函数有map，filter，reduce等等。

#### 部分函数应用（partial function application）

当一个函数有多个参数的时候，我们可以直接赋值其中的一部分，返回的结果是一个接受剩下参数返回结果的函数，例如我们有个函数：

```haskell
addThree a b c = a + b + c
```

那么addThree 2，返回的就是一个接受两个数字并且返回这两个数字之和加上2的函数。

#### 柯里化（curring）

柯里化是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

通俗一点就是把多参函数，每次部分函数应用第一个参数，直至剩下一个参数。

addThree柯里化后，表示的就是接受一个数a，然后返回一个接受两个数b，c并且返回a+b+c的函数。



### 相关文章

- [函数式编程初探](http://www.ruanyifeng.com/blog/2012/04/functional_programming.html)
- [Functional programming](https://en.wikipedia.org/wiki/Functional_programming)
my first post
![](home/footprint.png)
