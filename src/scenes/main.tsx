import {Img, Shape, Spline, Txt, makeScene2D, Layout, Rect} from '@motion-canvas/2d';
import {all, createRef, beginSlide, easeOutCubic, tween, map, easeInOutCubic, spring, PlopSpring, chain, fadeTransition} from '@motion-canvas/core';

import dome from '../assets/dome.jpg';
import climbbars from '../assets/climbbars.jpg'

export default makeScene2D(function* (view) {
  const parabola1 = createRef<Spline>();
  const parabola2 = createRef<Spline>();
  const img1 = createRef<Img>();
  const img2 = createRef<Img>();
  const text1a = createRef<Txt>();
  const text1b = createRef<Txt>();
  const text1c = createRef<Txt>();
  const textroot = createRef<Layout>();
  const text2a = createRef<Txt>();
  const text2b = createRef<Txt>();
  const text2c = createRef<Txt>();

  view.add(
    <Img
      layout
      ref={img1}
      src={dome}
      clip
      scale={.25}
      justifyContent={"center"}
      alignContent={"center"}
      direction={"column"}
      radius={100}
      x={1350}
      opacity={0}
    >
        <Spline
          ref={parabola1}
          lineWidth={10}
          scale={4}
          marginLeft={1125}
          marginTop={200}
          stroke={"#ea999c"}
          points={[
            [-430, 302.8],
            [0, -104],
            [430, 302.8]
          ]}
          end={0}
          smoothness={0}
        >
      </Spline>
    </Img>
  );

  yield* beginSlide("Parabola 1");
  yield tween(.8, value => {
    img1().position.x(map(1400, 0, easeOutCubic(value)))
  });
  yield* img1().opacity(1, 0.8);

  yield parabola1().end(1, 1);
  yield* parabola1().smoothness(0.525, 1);

  yield tween(1, value => {
    img1().position.x(map(img1().x(), 300, easeInOutCubic(value)))
  });
  
  view.add(
    <Layout
      ref={textroot}
      layout
      x={-525}
      direction={"column"}
    >
      <Txt
        ref={text1a}
        fontFamily={"Jetbrains Mono"}
        fontSize={75}
        fill={"#c6d0f5"}
      />
      <Txt
        ref={text1b}
        fontFamily={"Jetbrains Mono"}
        fontSize={40}
        opacity={0}
        fill={"#c6d0f5"}
        text={"."}
        marginLeft={10}
      />
      <Txt
        ref={text1c}
        fontFamily={"Jetbrains Mono"}
        fontSize={40}
        opacity={0}
        fill={"#c6d0f5"}
        text={"."}
        marginLeft={10}
      />
    </Layout>
  );

  yield* text1a().text("f(x)=-0.22x²+1.04", 0.5);
  yield* textroot().y(textroot().y() - 30, 0.5);
  yield* all(
    text1b().opacity(1, 0.5),
    text1b().text("f(x)=-.22(x-2.1742)(x+2.1742)", 0.5),
  );
  
  yield* all(
    text1c().opacity(1, 0.5),
    text1c().text("f(x)=-0.22x²+1.04", 0.5),
  );

  yield* beginSlide("Explination 1");

  yield* all(
    text1b().opacity(0, 0.3),
    text1c().opacity(0, 0.3),
  );
  
  yield* all(
    text1b().text(".", 0),
    text1c().text(".", 0),
  );

  yield text1a().scale(0.75, 0.8);
  yield* text1a().text("This works because\nthe curve of the\ndome is the shape\nof a parabola, it is the\nshape of a parabola\nbecause it has two\ncurves that lead into\na vertex.", 0.8);
  
  yield* beginSlide("Parabola 2");

  view.add(
    <Img
      layout
      ref={img2}
      src={climbbars}
      clip
      scale={.25}
      justifyContent={"center"}
      alignContent={"center"}
      direction={"column"}
      radius={100}
      x={300}
      opacity={0}
    >
        <Spline
          ref={parabola2}
          lineWidth={10}
          scale={4}
          marginLeft={1050}
          marginTop={500}
          stroke={"#ca9ee6"}
          points={[
            [-430, 302.8],
            [0, -104],
            [430, 302.8]
          ]}
          end={0}
          smoothness={0}
        >
      </Spline>
    </Img>
  );

  view.add(
    <Layout
      ref={textroot}
      layout
      x={-525}
      direction={"column"}
    >
      <Txt
        ref={text2a}
        fontFamily={"Jetbrains Mono"}
        fontSize={65}
        fill={"#c6d0f5"}
      />
      <Txt
        ref={text2b}
        fontFamily={"Jetbrains Mono"}
        fontSize={40}
        opacity={0}
        fill={"#c6d0f5"}
        text={"."}
        marginLeft={6}
      />
      <Txt
        ref={text2c}
        fontFamily={"Jetbrains Mono"}
        fontSize={40}
        opacity={0}
        fill={"#c6d0f5"}
        text={"."}
        marginLeft={6}
      />
    </Layout>
  );

  yield* text1a().opacity(0, 0.3);
  yield* all(
    img2().opacity(1, 0.8),
    text2a().text("f(x)=-0.36x²+0.1x+0.6", 0.8),
    parabola2().end(1, 0.8),
  );
  
  yield* all(
    text2b().text("f(x)=-0.36(x+1.16)(x-1.437)", 0.8),
    text2b().opacity(1, 0.8),
    parabola2().smoothness(0.4, 0.8),
  );

  yield* all(
    text2c().text("f(x)=-0.36(x-0.139)²+0.607", 0.8),
    text2c().opacity(1,0.8),
  );

  yield* img1().opacity(0),
  yield* tween(0.4, value => {
    img2().rotation(easeOutCubic(-value))
  });

  yield* all(
    text2a().text("f(x)=0.36x²-0.1x-0.6", 0.8),
    text2b().text("f(x)=0.36(x+1.16)(x-1.437) ", 0.8),
    text2c().text("f(x)=0.36(x-0.139)²-0.607", 0.8),
    spring(PlopSpring, 0, 180, .2, value => {
      img2().rotation(value);
    }),
  );

  yield* beginSlide("Explanation 2");
  yield* all(
    text2b().text("",0.8),
    text2c().text("", 0.8),
    text2a().scale(.8, 0.8),
    text2a().text("This is a parabola\nbecause it has two\ncurves that are\nexponential and that\nmeet at a vertex, also it\nis a parabola because it\nis in a similar shape as\na parabola", 0.8),
  );

  yield* beginSlide("xint1a");
});