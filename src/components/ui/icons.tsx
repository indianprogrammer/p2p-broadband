import { createElement } from "react";
import type { ReactElement, SVGProps } from "react";

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, "strokeWidth"> {
  size?: number | string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
}

export type IconComponent = (props: IconProps) => ReactElement;

type IconNode = readonly [tag: string, attrs: Record<string, string | number>];

const NODE_TAGS: Record<string, string> = {
  path: "path",
  circle: "circle",
  rect: "rect",
  line: "line",
  polygon: "polygon",
  polyline: "polyline",
  ellipse: "ellipse",
  g: "g",
};

function renderNodes(nodes: readonly IconNode[]) {
  return nodes.map(([tag, attrs], i) =>
    createElement(NODE_TAGS[tag] ?? tag, { key: i, ...attrs }),
  );
}

function makeIcon(displayName: string, nodes: readonly IconNode[]) {
  function Icon(props: IconProps) {
    const {
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth = false,
      ...rest
    } = props;

    return createElement(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: absoluteStrokeWidth
          ? Number(strokeWidth) / (Number(size) / 24)
          : strokeWidth,
        ...rest,
      },
      renderNodes(nodes),
    );
  }
  Icon.displayName = displayName;
  return Icon;
}

const CalendarNodes = [
    ["path", { d: "M8 2v3" }],
    ["path", { d: "M16 2v3" }],
    ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }],
    ["path", { d: "M3 9h18" }],
  ] as const;

const TagNodes = [
    ["path", { d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" }],
    ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor" }],
  ] as const;

const ArrowLeftNodes = [
    ["path", { d: "m12 19-7-7 7-7" }],
    ["path", { d: "M19 12H5" }],
  ] as const;

const ArrowRightNodes = [
    ["path", { d: "M5 12h14" }],
    ["path", { d: "m12 5 7 7-7 7" }],
  ] as const;

const MailNodes = [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }],
    ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }],
  ] as const;

const PhoneNodes = [
    ["path", { d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" }],
  ] as const;

const MapPinNodes = [
    ["path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }],
    ["circle", { cx: "12", cy: "10", r: "3" }],
  ] as const;

const ClockNodes = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 6v6l4 2" }],
  ] as const;

const SendNodes = [
    ["path", { d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" }],
    ["path", { d: "m21.854 2.147-10.94 10.939" }],
  ] as const;

const Loader2Nodes = [
    ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }],
  ] as const;

const CheckCircleNodes = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335" }],
    ["path", { d: "m9 11 3 3L22 4" }],
  ] as const;

const AlertCircleNodes = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }],
  ] as const;

const CheckNodes = [
    ["path", { d: "M20 6 9 17l-5-5" }],
  ] as const;

const ShieldNodes = [
    ["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }],
  ] as const;

const WifiNodes = [
    ["path", { d: "M12 20h.01" }],
    ["path", { d: "M2 8.82a15 15 0 0 1 20 0" }],
    ["path", { d: "M5 12.859a10 10 0 0 1 14 0" }],
    ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0" }],
  ] as const;

const MonitorNodes = [
    ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
    ["line", { x1: "8", x2: "16", y1: "21", y2: "21" }],
    ["line", { x1: "12", x2: "12", y1: "17", y2: "21" }],
  ] as const;

const SmartphoneNodes = [
    ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2" }],
    ["path", { d: "M12 18h.01" }],
  ] as const;

const SearchNodes = [
    ["path", { d: "m21 21-4.34-4.34" }],
    ["circle", { cx: "11", cy: "11", r: "8" }],
  ] as const;

const ChevronDownNodes = [
    ["path", { d: "m6 9 6 6 6-6" }],
  ] as const;

const GaugeNodes = [
    ["path", { d: "m12 14 4-4" }],
    ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0" }],
  ] as const;

const TvNodes = [
    ["path", { d: "m17 2-5 5-5-5" }],
    ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2" }],
  ] as const;

const TabletNodes = [
    ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2" }],
    ["line", { x1: "12", x2: "12.01", y1: "18", y2: "18" }],
  ] as const;

const SparklesNodes = [
    ["path", { d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" }],
    ["path", { d: "M20 2v4" }],
    ["path", { d: "M22 4h-4" }],
    ["circle", { cx: "4", cy: "20", r: "2" }],
  ] as const;

const TargetNodes = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["circle", { cx: "12", cy: "12", r: "6" }],
    ["circle", { cx: "12", cy: "12", r: "2" }],
  ] as const;

const UsersNodes = [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }],
    ["circle", { cx: "9", cy: "7", r: "4" }],
  ] as const;

const AwardNodes = [
    ["path", { d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" }],
    ["circle", { cx: "12", cy: "8", r: "6" }],
  ] as const;

const GlobeNodes = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }],
    ["path", { d: "M2 12h20" }],
  ] as const;

const ZapNodes = [
    ["path", { d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" }],
  ] as const;

const DownloadNodes = [
    ["path", { d: "M12 15V3" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
    ["path", { d: "m7 10 5 5 5-5" }],
  ] as const;

const UploadNodes = [
    ["path", { d: "M12 3v12" }],
    ["path", { d: "m17 8-5-5-5 5" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
  ] as const;

const HeadphonesNodes = [
    ["path", { d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" }],
  ] as const;

const IndianRupeeNodes = [
    ["path", { d: "M6 3h12" }],
    ["path", { d: "M6 8h12" }],
    ["path", { d: "m6 13 8.5 8" }],
    ["path", { d: "M6 13h3" }],
    ["path", { d: "M9 13c6.667 0 6.667-10 0-10" }],
  ] as const;

const CpuNodes = [
    ["path", { d: "M12 20v2" }],
    ["path", { d: "M12 2v2" }],
    ["path", { d: "M17 20v2" }],
    ["path", { d: "M17 2v2" }],
    ["path", { d: "M2 12h2" }],
    ["path", { d: "M2 17h2" }],
    ["path", { d: "M2 7h2" }],
    ["path", { d: "M20 12h2" }],
    ["path", { d: "M20 17h2" }],
    ["path", { d: "M20 7h2" }],
    ["path", { d: "M7 20v2" }],
    ["path", { d: "M7 2v2" }],
    ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }],
    ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1" }],
  ] as const;

const SignalNodes = [
    ["path", { d: "M2 20h.01" }],
    ["path", { d: "M7 20v-4" }],
    ["path", { d: "M12 20v-8" }],
    ["path", { d: "M17 20V8" }],
    ["path", { d: "M22 4v16" }],
  ] as const;

const HomeNodes = [
    ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }],
    ["path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }],
  ] as const;

const SatelliteNodes = [
    ["path", { d: "m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5" }],
    ["path", { d: "M16.5 7.5 19 5" }],
    ["path", { d: "m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5" }],
    ["path", { d: "M9 21a6 6 0 0 0-6-6" }],
    ["path", { d: "M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z" }],
  ] as const;

const StarNodes = [
    ["path", { d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" }],
  ] as const;

const QuoteNodes = [
    ["path", { d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" }],
    ["path", { d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" }],
  ] as const;

const PlayNodes = [
    ["path", { d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" }],
  ] as const;

const FilmNodes = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M7 3v18" }],
    ["path", { d: "M3 7.5h4" }],
    ["path", { d: "M3 12h18" }],
    ["path", { d: "M3 16.5h4" }],
    ["path", { d: "M17 3v18" }],
    ["path", { d: "M17 7.5h4" }],
    ["path", { d: "M17 16.5h4" }],
  ] as const;

const MusicNodes = [
    ["path", { d: "M9 18V5l12-2v13" }],
    ["circle", { cx: "6", cy: "18", r: "3" }],
    ["circle", { cx: "18", cy: "16", r: "3" }],
  ] as const;

const ServerNodes = [
    ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2" }],
    ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2" }],
    ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6" }],
    ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18" }],
  ] as const;

export const Calendar = makeIcon("Calendar", CalendarNodes);
export const Tag = makeIcon("Tag", TagNodes);
export const ArrowLeft = makeIcon("ArrowLeft", ArrowLeftNodes);
export const ArrowRight = makeIcon("ArrowRight", ArrowRightNodes);
export const Mail = makeIcon("Mail", MailNodes);
export const Phone = makeIcon("Phone", PhoneNodes);
export const MapPin = makeIcon("MapPin", MapPinNodes);
export const Clock = makeIcon("Clock", ClockNodes);
export const Send = makeIcon("Send", SendNodes);
export const Loader2 = makeIcon("Loader2", Loader2Nodes);
export const CheckCircle = makeIcon("CheckCircle", CheckCircleNodes);
export const AlertCircle = makeIcon("AlertCircle", AlertCircleNodes);
export const Check = makeIcon("Check", CheckNodes);
export const Shield = makeIcon("Shield", ShieldNodes);
export const Wifi = makeIcon("Wifi", WifiNodes);
export const Monitor = makeIcon("Monitor", MonitorNodes);
export const Smartphone = makeIcon("Smartphone", SmartphoneNodes);
export const Search = makeIcon("Search", SearchNodes);
export const ChevronDown = makeIcon("ChevronDown", ChevronDownNodes);
export const Gauge = makeIcon("Gauge", GaugeNodes);
export const Tv = makeIcon("Tv", TvNodes);
export const Tablet = makeIcon("Tablet", TabletNodes);
export const Sparkles = makeIcon("Sparkles", SparklesNodes);
export const Target = makeIcon("Target", TargetNodes);
export const Users = makeIcon("Users", UsersNodes);
export const Award = makeIcon("Award", AwardNodes);
export const Globe = makeIcon("Globe", GlobeNodes);
export const Zap = makeIcon("Zap", ZapNodes);
export const Download = makeIcon("Download", DownloadNodes);
export const Upload = makeIcon("Upload", UploadNodes);
export const Headphones = makeIcon("Headphones", HeadphonesNodes);
export const IndianRupee = makeIcon("IndianRupee", IndianRupeeNodes);
export const Cpu = makeIcon("Cpu", CpuNodes);
export const Signal = makeIcon("Signal", SignalNodes);
export const Home = makeIcon("Home", HomeNodes);
export const Satellite = makeIcon("Satellite", SatelliteNodes);
export const Star = makeIcon("Star", StarNodes);
export const Quote = makeIcon("Quote", QuoteNodes);
export const Play = makeIcon("Play", PlayNodes);
export const Film = makeIcon("Film", FilmNodes);
export const Music = makeIcon("Music", MusicNodes);
export const Server = makeIcon("Server", ServerNodes);
