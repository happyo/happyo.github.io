---
layout:     post
title:      "Flutter Rendering"
date:       2020-03-12 18:10:00 +0800
author:     "happyo"
-

# 首先是runApp方法

```dart
void runApp(Widget app) {
  WidgetsFlutterBinding.ensureInitialized()
    ..scheduleAttachRootWidget(app)
    ..scheduleWarmUpFrame();
}
```

# WidgetFlutterBinding类
## A concrete binding for applications based on the Widgets framework.
## This is the glue that binds the framework to the Flutter engine.
## 连接Flutter Engine 跟 App framework的类，这个类mixin了 GestureBinding， ServicesBinding， SchedulerBinding， PaintingBinding， RendererBinding，WidgetsBinding等。

### WidgetsBinding
#### The glue between the widgets layer and the Flutter engine.
##### 这个类会持有BuildOwner
###### This class tracks which widgets need rebuilding, and handles other tasks that apply to widget trees as a whole, such as managing the inactive element list for the tree and triggering the "reassemble" command when necessary during hot reload when debugging.

### RendererBinding
#### The glue between the render tree and the Flutter engine.

##### 这个类持有PipelineOwner
###### The pipeline owner manages the rendering pipeline.
###### The pipeline owner provides an interface for driving the rendering pipeline and stores the state about which render objects have requested to be visited in each stage of the pipeline. To flush the pipeline, call the following functions in order:
###### 1. [flushLayout] updates any render objects that need to compute their layout. During this phase, the size and position of each render object is calculated. Render objects might dirty their painting or compositing state during this phase.
###### 2. [flushCompositingBits] updates any render objects that have dirty compositing bits. During this phase, each render object learns whether any of its children require compositing. This information is used during the painting phase when selecting how to implement visual effects such as clipping. If a render object has a composited child, its needs to use a [Layer] to create the clip in order for the clip to apply to the composited child (which will be painted into its own [Layer]).
###### 3. [flushPaint] visits any render objects that need to paint. During this phase, render objects get a chance to record painting commands into [PictureLayer]s and construct other composited [Layer]s.
###### 4. Finally, if semantics are enabled, [flushSemantics] will compile the semantics for the render objects. This semantic information is used by assistive technology to improve the accessibility of the render tree.
###### The [RendererBinding] holds the pipeline owner for the render objects that are visible on screen. You can create other pipeline owners to manage off-screen objects, which can flush their pipelines independently of the on-screen render objects.

##### 然后会initRenderView，RenderView解释如下
###### The root of the render tree.The view represents the total output surface of the render tree and handles bootstrapping the rendering pipeline. The view has a unique child [RenderBox], which is required to fill the entire output surface.
###### 在renderView被赋值的时候会调用set方法，将之前创建的pipelineOwner的rootNode设为自己，这样pipelineOwner就有了render tree的引用。
```dart
set renderView(RenderView value) {
    assert(value != null);
    _pipelineOwner.rootNode = value;
}
```

##### 接着会调用renderView.prepareInitialFrame();
###### 
