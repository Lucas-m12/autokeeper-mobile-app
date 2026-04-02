import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import Svg, {
  Path,
  Line,
  Rect,
  Circle,
  Ellipse,
  G,
} from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function useOpacityLoop(from: number, to: number, duration: number, delay: number = 0) {
  const value = useSharedValue(from);

  useEffect(() => {
    value.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(to, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
          withTiming(from, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      ),
    );
  }, []);

  return value;
}

function useAnimatedOpacityProps(value: Animated.SharedValue<number>) {
  return useAnimatedProps(() => ({ opacity: value.value }));
}

export function NightIllustration() {
  const window1 = useOpacityLoop(0.05, 0.2, 3000);
  const window2 = useOpacityLoop(0.05, 0.2, 3500, 1000);
  const window3 = useOpacityLoop(0.05, 0.2, 3000, 1500);
  const window4 = useOpacityLoop(0.05, 0.2, 4000, 2000);
  const headlight = useOpacityLoop(0.7, 1, 2000);
  const star1 = useOpacityLoop(0.1, 0.4, 3000);
  const star2 = useOpacityLoop(0.2, 0.5, 4000);

  const window1Props = useAnimatedOpacityProps(window1);
  const window2Props = useAnimatedOpacityProps(window2);
  const window3Props = useAnimatedOpacityProps(window3);
  const window4Props = useAnimatedOpacityProps(window4);
  const headlightProps = useAnimatedOpacityProps(headlight);
  const star1Props = useAnimatedOpacityProps(star1);
  const star2Props = useAnimatedOpacityProps(star2);

  return (
    <Svg
      width={300}
      height={240}
      viewBox="0 0 320 260"
      fill="none"
      style={styles.svg}
    >
      {/* Road */}
      <Path
        d="M-10 225 L160 168 L330 225"
        stroke="rgba(136,153,174,0.05)"
        strokeWidth={65}
        fill="none"
      />

      {/* Lane markers */}
      <Line
        x1={125} y1={198} x2={135} y2={194}
        stroke="rgba(232,168,56,0.2)" strokeWidth={2.5} strokeLinecap="round"
      />
      <Line
        x1={146} y1={186} x2={153} y2={183}
        stroke="rgba(232,168,56,0.14)" strokeWidth={2} strokeLinecap="round"
      />
      <Line
        x1={159} y1={178} x2={164} y2={176}
        stroke="rgba(232,168,56,0.08)" strokeWidth={1.5} strokeLinecap="round"
      />

      {/* City skyline */}
      <Rect x={40} y={92} width={15} height={66} rx={2} fill="rgba(20,184,166,0.05)" />
      <Rect x={62} y={78} width={13} height={82} rx={2} fill="rgba(20,184,166,0.045)" />
      <Rect x={238} y={88} width={17} height={72} rx={2} fill="rgba(20,184,166,0.045)" />
      <Rect x={265} y={82} width={13} height={78} rx={2} fill="rgba(20,184,166,0.05)" />

      {/* Window lights */}
      <AnimatedRect
        x={46} y={100} width={3} height={3} rx={0.5}
        fill="rgba(232,168,56,0.12)"
        animatedProps={window1Props}
      />
      <AnimatedRect
        x={64} y={86} width={3} height={3} rx={0.5}
        fill="rgba(232,168,56,0.12)"
        animatedProps={window2Props}
      />
      <AnimatedRect
        x={244} y={96} width={3} height={3} rx={0.5}
        fill="rgba(232,168,56,0.12)"
        animatedProps={window3Props}
      />
      <AnimatedRect
        x={271} y={90} width={3} height={3} rx={0.5}
        fill="rgba(232,168,56,0.12)"
        animatedProps={window4Props}
      />

      {/* Car */}
      <G transform="translate(110,115)">
        {/* Shadow */}
        <Ellipse cx={48} cy={72} rx={54} ry={5} fill="rgba(0,0,0,0.3)" />

        {/* Body */}
        <Rect
          x={4} y={34} width={88} height={27} rx={6}
          fill="#14202e" stroke="#1c2d4a" strokeWidth={1.5}
        />

        {/* Roof */}
        <Path
          d="M23 34 L32 12 L68 12 L77 34"
          fill="#0e1a2a" stroke="#1c2d4a" strokeWidth={1.5}
        />

        {/* Windows */}
        <Path
          d="M34 15 L28 32 L48 32 L48 15Z"
          fill="rgba(20,184,166,0.07)" stroke="rgba(20,184,166,0.13)" strokeWidth={0.5}
        />
        <Path
          d="M51 15 L51 32 L72 32 L65 15Z"
          fill="rgba(20,184,166,0.07)" stroke="rgba(20,184,166,0.13)" strokeWidth={0.5}
        />

        {/* Headlight */}
        <AnimatedCircle
          cx={88} cy={44} r={4}
          fill="#e8a838"
          animatedProps={headlightProps}
        />
        <Ellipse cx={96} cy={44} rx={14} ry={7} fill="rgba(232,168,56,0.06)" />

        {/* Taillight */}
        <Circle cx={7} cy={44} r={2.5} fill="#f43f5e" opacity={0.75} />

        {/* Front wheel */}
        <Circle cx={23} cy={61} r={9.5} fill="#080e1a" stroke="#1c2d4a" strokeWidth={1.5} />
        <Circle cx={23} cy={61} r={5} fill="none" stroke="rgba(136,153,174,0.1)" strokeWidth={1} />
        <Circle cx={23} cy={61} r={2} fill="rgba(136,153,174,0.15)" />

        {/* Rear wheel */}
        <Circle cx={71} cy={61} r={9.5} fill="#080e1a" stroke="#1c2d4a" strokeWidth={1.5} />
        <Circle cx={71} cy={61} r={5} fill="none" stroke="rgba(136,153,174,0.1)" strokeWidth={1} />
        <Circle cx={71} cy={61} r={2} fill="rgba(136,153,174,0.15)" />

        {/* Roof accent */}
        <Line
          x1={32} y1={12} x2={68} y2={12}
          stroke="rgba(20,184,166,0.18)" strokeWidth={1}
        />
      </G>

      {/* Stars */}
      <AnimatedCircle
        cx={82} cy={38} r={1.5}
        fill="rgba(232,168,56,0.25)"
        animatedProps={star1Props}
      />
      <AnimatedCircle
        cx={200} cy={28} r={1}
        fill="rgba(20,184,166,0.25)"
        animatedProps={star2Props}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  svg: {
    alignSelf: 'center',
  },
});
