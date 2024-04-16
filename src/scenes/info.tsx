import { Spline, makeScene2D, Node, Grid, Line, Circle, Txt, Rect, Shape, Layout, Img } from "@motion-canvas/2d";
import { PossibleVector2, SignalValue, Vector2, all, beginSlide, chain, createRef, createSignal, easeInExpo, easeInOutBack, easeInOutCirc, easeInOutCubic, easeInOutQuad, easeOutBack, easeOutExpo, easeOutQuad, fadeTransition, map, tween, waitFor, waitUntil } from "@motion-canvas/core";

import hillvertex from "../assets/hillvertex.jpg"

export default makeScene2D(function* (view) {
  const parabola1 = createRef<Spline>();
  const parabola2 = createRef<Spline>();
  const root = createRef<Node>();
  const scale = createSignal(1);
  const progress = createSignal(0);
  const splineScale = createSignal(1);
  const parabolaInt1 = createRef<Circle>();
  const parabolaInt2 = createRef<Circle>();
  const parabolaIntText = createRef<Txt>();
  const title = createRef<Txt>();
  const titlebox = createRef<Rect>();
  const domain = createRef<Layout>();
  const domainVisual = createRef<Layout>();
  const domainText = createRef<Txt>();
  const domainRotation = createSignal(180);
  const vertexCard = createRef<Rect>();
  const vertexText = createRef<Txt>();
  const endText = createRef<Txt>();
  const longboi = createRef<Rect>();

  view.add(
    <Node
      ref={root}
      x={0}
    >
      <Line
        x={0}
        points={[
          [0, -1080], 
          [0, 1080]
        ]}
        stroke={"#babbf1"}
        lineWidth={5}
      />
      <Line
        y={0}
        points={[
          [-1920, 0], 
          [1920, 0]
        ]}
        stroke={"#babbf1"}
        lineWidth={5}
      />
      <Grid
        width={10000}
        height={10000}
        spacing={() => scale() * 100}
        stroke={'#c6d0f5'}
        lineWidth={1}
        lineCap="square"
        cache
      />
      <Spline
        ref={parabola1}
        scale={() => splineScale()}
        endArrow={true}
        startArrow={true}
        lineWidth={() => -splineScale() + 7}
        marginLeft={1125}
        marginTop={200}
        stroke={"#ea999c"}
        points={[
          [-430, 302.8],
          [0, -104],
          [430, 302.8]
        ]}
        end={0}
        smoothness={0.525}
      />
      <Spline
        ref={parabola2}
        scale={() => splineScale()}
        lineWidth={() => -splineScale() + 7}
        marginLeft={1050}
        marginTop={500}
        x={40}
        endArrow={true}
        startArrow={true}
        stroke={"#ca9ee6"}
        points={[
          [-430, -302.8],
          [0, 104],
          [430, -302.8]
        ]}
        end={0}
        smoothness={0.4}
      />
       <Txt
        ref={parabolaIntText}
        text={""}
        fontFamily={"Jetbrains Mono"}
        fontSize={50}
        fill={"#81c8be"}
      />
      <Circle    
        ref={parabolaInt1}
        size={0}
        fill={"#babbf1"}
        x={-685}
      />
      <Circle    
        ref={parabolaInt2}
        size={0}
        fill={"#85c1dc"}
        x={-685}
      />
    </Node>
  );
  
  view.add(
    <Rect
      ref={titlebox}
      width={250}
      height={70}
      justifyContent={"center"}
      fill={"#eebebe"}
      layout
      clip
      radius={12}
      x={-820}
      y={-600}

    >
      <Txt 
        marginTop={17}
        ref={title}
        fontFamily={"Jetbrains Mono"}
        fontSize={35}
        fill={"#232634"}
      />
    </Rect>
  );

  view.add(
    <Layout
      ref={domain}
      layout
      y={400}
      opacity={0}
      rotation={() => domainRotation()}
      direction={"column-reverse"}
    >

      <Layout
        ref={domainVisual}
        clip
        direction={"row"}
      >
        <Rect
          fill={"#f2d5cf"}
          width={10}
          height={50}
        />
        <Rect
          ref={longboi}
          fill={"#f2d5cf"}
          width={1000}
          height={10}
        />
        <Rect
          fill={"#f2d5cf"}
          width={10}
          height={50}
        />
      </Layout>
      <Txt
        ref={domainText}
        fontFamily={"Jetbrains Mono"}
        text={"-1.75<x<2"}
        rotation={() => -domainRotation()}
        paddingTop={10}
        fill={"#f2d5cf"}
      />
    </Layout>
  );

  view.add(
    <Rect
      ref={vertexCard}
      width={0}
      height={260}
      y={-400}
      radius={30}
      fill={"#414559"}
      layout
      clip
      direction={"row"}
    >
      <Img
        src={hillvertex}
        scale={1}
      />
      <Layout
        direction={"column"}
        margin={20}
        marginTop={40}
      >
        <Txt
          fill={"#c6d0f5"}
          fontFamily={"Jetbrains Mono"}
          fontSize={80}
          fontWeight={1000}
          text={"Vertex"}
        />
        <Txt
          ref={vertexText}
          fill={"#c6d0f5"}
          fontFamily={"Jetbrains Mono"}
          fontSize={35}
          fontWeight={1}
          text={"(0, 1.04)"}
        />
      </Layout>
    </Rect>
  );

  yield* chain(
    all(
      titlebox().position.y(-470, 0.5, easeOutExpo),
      title().text("Parabola 1", 0.5),
      parabola1().start(0, 0.5),
      parabola1().end(1, 0.5),
    ),

    domain().opacity(1, 0.5),
    waitFor(2),
    all(
      domain().position([-550, 100], 0.4),
      domainRotation(270, 0.4),
    ),

    longboi().width(700, 0.5),
    domainText().text("-0.607<y<1.04", 0.5),

    beginSlide("xint1a"),
    
    domain().opacity(0, 0.5),
    all(
      domain().opacity(0, 0.5),
      longboi().width(900, 0),
      domainRotation(180, 0),
      domain().position([40, 300], 0),
    ),

    all(
      root().position.x(600, 0.5),
      splineScale(3.5, 0.5),
      scale(3.5, 0.5),
    ),

    dCoords(
      parabolaInt1(),
      [-780, 0],
      -300,
      0,
      parabolaIntText(),
      "(-2.174, 0)",
      "int1b"
    ),
  );

  yield* chain(
    tween(0.8, value => {
      root().position.x(map(600, -800, easeInOutCubic(value)));
    }),

    dCoords(
      parabolaInt1(),
      [780, 0],
      1780,
      0,
      parabolaIntText(),
      "(-2.174, 0)",
      "yint1"
    ),
  );

  yield* chain(
    all(
      root().position([0, 200], 0.5, easeOutBack),
      parabolaInt1().size(0, 0.5),
      parabolaIntText().text("", 0.5),
    ),

    dCoords(
      parabolaInt1(),
      [0, -365],
      -950,
      -370,
      parabolaIntText(),
      "(-2.174, 0)",
      "vertex1"
    ),
  );

  yield* all(
    scale(1, 0.5),
    splineScale(1, 0.5),
    root().position([0, 0], 0.5),
  ),
  
  yield* chain(
    parabolaInt1().position.y(-105, 0),
    parabolaInt1().size(40, 0.5),
    all(
      parabolaInt1().ripple(),
      vertexCard().width(590, 0.5),
    ),
    beginSlide("domain/range2"),
    all(
      vertexCard().width(0, 0.5),
      parabolaInt1().size(0, 0.5),
    ),
    parabola1().end(0, 0.5),
  );

  yield* chain(
    
    all(
      titlebox().fill("#ca9ee6", 0.5),
      title().text("", 0.5),
      parabola2().start(1, 0.5),
    ),

    domainText().text("-2.5<x<2.5", 0),
    domain().opacity(1, 0.5),
    waitFor(2),
    
    all(
      domainRotation(270, 0.8),
      domain().position([-500, -80], 0.5),
    ),
    longboi().width(600, 0.4),
    domainText().text("-0.3<y<1.04", 0.4),

    beginSlide("xint2a"),
    domain().opacity(0, 0.5),

    all(
      root().position.x(600, 0.5),
      splineScale(3.5, 0.5),
      scale(3.5, 0.5),
      title().text("Parabola 2", 0.5),
    ),

    dCoords(
      parabolaInt2(), 
      [-645, 0], 
      200,
      0,
      parabolaIntText(), 
      "(-1.16, 0)",
      "int2b"
    ),
  );

  yield* chain(
    root().position.x(-600, 0.5),
    dCoords(
      parabolaInt2(), 
      [725, 0], 
      1200, 0,
      parabolaIntText(), 
      "(1.437, 0)",
      "yint2"
    ),
  );

  yield* chain(
    root().position([0, -250], 0.5),
    dCoords(
      parabolaInt2(), 
      [0, 360], 
      -880, 510,
      parabolaIntText(), 
      "(0, -0.6)",
      "vertex"
    ),
  );

  yield* chain(
    all(
      scale(1, 0.5),
      splineScale(1, 0.5),
      root().position([0, 0], 0.5),
    ), 

    vertexText().text("(0.139, -0.607)", 0),
    parabolaInt2().position([35, 100], 0.5),

    all(
      vertexCard().width(590, 0.5),
      parabolaInt2().size(40, 0.5),
      parabolaInt2().ripple(),
    ),

    beginSlide("END"),

    all(
      parabolaInt2().size(0, 0.5),
      vertexCard().width(0, 0.5),
    ),
    
    all(
      parabola2().start(0, 0.5),
      titlebox().position.y(-1000, 0.5),
      root().opacity(0, 0.5),
    ),
  );

  view.add(
    <Txt
      ref={endText}
      fontFamily={"Jetbrains Mono"}
      fontSize={100}
      fontWeight={1000}
      fill={"#c6d0f5"}
    />
  );

  yield* endText().text("Thank You For Listening! :)", 0.5);
});

function* dCoords(inter: Circle, position: SignalValue<PossibleVector2<number>>, offsetX: number, offsetY: number, textObj: Txt, text: SignalValue<string>, slideName: string) {
  yield* chain(
    inter.position(position, 0),
    textObj.position([inter.position.x() + offsetX, inter.position.y() - 60 + offsetY], 0),
    inter.size(60, 0.5),
    all(
      textObj.text(text, 0.5),
      inter.ripple(),
    ),
  );

  yield* beginSlide(slideName);
  yield* all(
    textObj.text("", 0.5),
    inter.size(0, 0.5),
  );
}
