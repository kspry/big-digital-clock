import { onMounted, ref } from "vue";
import useClock from "@/hooks/useClock";
import usePosition from "@/hooks/usePosition";
import useSettings from "@/hooks/useSettings";

const WIDTH = 1920;
const HEIGHT = 660;

let ctx = null;

export default () => {
  const the_canvas = ref(null);
  const { hours, minutes, seconds, period } = useClock();
  const {
    defaultHoursPosX,
    hoursPos,
    minutesPos,
    periodPos,
    secondsPos,
    separatorPos
  } = usePosition();
  const { blink, burnin, color, format, glow, sepia, zero } = useSettings();

  let showSeparator;
  let previousSeconds;

  const pad = (value, targetLength = 2) =>
    value.toString().padStart(targetLength, "0");

  const render = () => {
    window.requestAnimationFrame(() => {
      document.body.style.backgroundColor = color.background;

      document
        .querySelector("meta[name=theme-color]")
        .setAttribute("content", color.background);

      // reset
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // foreground
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.font = "400 700px digital-7_monomono";
      ctx.fillStyle = color.foreground;

      // shadow
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = glow.blur;
      ctx.shadowColor = glow.visible ? color.foreground : color.background;

      showSeparator =
        !blink.value || (blink.value && previousSeconds !== seconds.value);
      previousSeconds = seconds.value;

      ctx.fillText(
        pad(hours.value, zero.value ? 2 : 1),
        hoursPos.value.x,
        hoursPos.value.y
      );
      ctx.fillText(showSeparator ? ":" : "", separatorPos.x, separatorPos.y);
      ctx.fillText(pad(minutes.value), minutesPos.x, minutesPos.y);
      ctx.font = "400 392px digital-7_monomono";
      ctx.fillText(pad(seconds.value), secondsPos.x, secondsPos.y);

      if (format.value.toString() === "12") {
        ctx.textAlign = "left";
        ctx.font = "700 100px sans-serif";
        ctx.fillText(period.value, periodPos.x, periodPos.y);
      }

      // burn-in
      if (burnin.visible) {
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.font = "400 700px digital-7_monomono";

        let burninAlpha = pad(
          Math.round((burnin.amount / 100) * 255).toString(16)
        );

        ctx.fillStyle = color.foreground + burninAlpha;

        ctx.fillText("08", defaultHoursPosX, hoursPos.value.y);

        ctx.fillText(":", separatorPos.x, separatorPos.y);

        ctx.fillText("88", minutesPos.x, minutesPos.y);

        ctx.font = "400 392px digital-7_monomono";
        ctx.fillText("88", secondsPos.x, secondsPos.y);

        if (format.value.toString() === "12") {
          ctx.textAlign = "left";
          ctx.font = "700 100px sans-serif";
          ctx.fillText("AM", periodPos.x, periodPos.y);
          ctx.fillText("PM", periodPos.x, periodPos.y);
        }
      }

      the_canvas.value.style.filter = sepia.visible
        ? `sepia(${sepia.amount}%)`
        : "initial";

      let overlay = document.querySelector(".overlay");

      overlay.style.backgroundColor = color.background;
      overlay.style.filter = sepia.visible
        ? `sepia(${sepia.amount}%)`
        : "initial";
    });
  };

  const resize = () => {
    let canvasWidth = the_canvas.value.width;
    let canvasHeight = the_canvas.value.height;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#scaling_canvas_using_css_transforms
    let scaleX = windowWidth / canvasWidth;
    let scaleY = windowHeight / canvasHeight;

    let scaleToFit = Math.min(scaleX, scaleY);

    let scaledWidth = canvasWidth * scaleToFit;
    let scaledHeight = canvasHeight * scaleToFit;

    let translateX = Math.round((windowWidth - scaledWidth) / 2);
    let translateY = Math.round((windowHeight - scaledHeight) / 2);

    the_canvas.value.style.transformOrigin = "0 0"; // scale from top left
    the_canvas.value.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleToFit})`;
  };

  onMounted(() => {
    the_canvas.value.height = HEIGHT;
    the_canvas.value.width = WIDTH;

    ctx = the_canvas.value.getContext("2d", { alpha: true });
  });

  return {
    the_canvas,
    render,
    resize
  };
};
