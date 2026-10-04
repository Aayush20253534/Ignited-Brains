"""Build original Projects overlays and a 10-second India network loop.

Usage: python scripts/generate-projects-graphics.py path/to/ne_10m_admin_0_countries_ind.geojson
Requires Pillow. Natural Earth boundary data is public domain; use the India POV file.
The network nodes are decorative, not a map of actual school locations.
"""
import json
import math
from pathlib import Path
import random
import sys
from PIL import Image, ImageChops, ImageDraw, ImageFilter

OUT = Path(__file__).resolve().parents[1] / "public/projects-v2"
OUT.mkdir(parents=True, exist_ok=True)


def svg(name, body, viewbox="0 0 1600 760"):
    document = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" fill="none" preserveAspectRatio="none" aria-hidden="true">{body}</svg>'
    (OUT / name).write_text(document + "\n")


def connectors(paths, nodes):
    return '<g stroke="#48b7f2" stroke-width="1.2" opacity=".68">' + ''.join(f'<path d="{p}" pathLength="1" data-draw=""/>' for p in paths) + '</g>' + ''.join(f'<circle cx="{x}" cy="{y}" r="4" fill="#ff8a40" data-pulse=""/><circle cx="{x}" cy="{y}" r="9" stroke="#ff8a40" opacity=".3"/>' for x, y in nodes)


hero_paths = ["M950 132H1018L1070 250", "M895 407H985L1100 390", "M1390 175H1340L1300 265", "M1415 605H1330L1270 510"]
svg("hero-technical-overlay.svg", connectors(hero_paths, [(1070,250),(1100,390),(1300,265),(1270,510)]) + '<g stroke="#459fd0" opacity=".18"><path d="M845 70h30m-15-15v30M1510 600h30m-15-15v30M710 625h30m-15-15v30"/><ellipse cx="1170" cy="390" rx="300" ry="240" stroke-dasharray="2 14"/><path d="M740 710H1500M800 700v20m100-20v20m100-20v20m100-20v20m100-20v20m100-20v20m100-20v20"/></g><path d="M950 132H1018L1070 250" pathLength="1" data-signal="" stroke="#ff8a40" stroke-width="2.5"/>')

rover_paths = ["M900 100H950L980 158", "M800 348H910L1010 368", "M1440 245H1360L1280 366", "M870 550H940L1080 595", "M1450 525H1370L1330 439"]
svg("featured-rover-overlay.svg", connectors(rover_paths, [(980,158),(1010,368),(1280,366),(1080,595),(1330,439)]) + '<path d="M1440 245H1360L1280 366" pathLength="1" data-signal="" stroke="#ff994c" stroke-width="2.8"/><g opacity=".15" stroke="#93cfff"><circle cx="1130" cy="400" r="200" stroke-dasharray="3 18"/><path d="M700 670H1520M720 660v20m80-20v20m80-20v20m80-20v20m80-20v20m80-20v20m80-20v20m80-20v20m80-20v20m80-20v20"/></g>')

earth_paths = ["M720 540Q970 180 1300 430", "M850 580Q1190 240 1470 500", "M960 650Q980 380 1300 430", "M1300 430Q1460 300 1550 330"]
svg("final-earth-network.svg", '<g stroke="#fa9d53" stroke-width="1" opacity=".55">' + ''.join(f'<path d="{p}"/>' for p in earth_paths) + '</g>' + ''.join(f'<path d="{p}" pathLength="1" data-signal="" stroke="#ffc786" stroke-width="2.5"/>' for p in earth_paths[:3]) + ''.join(f'<circle cx="{x}" cy="{y}" r="4" fill="#ffc879" data-pulse=""/>' for x,y in [(720,540),(1300,430),(850,580),(1470,500),(960,650),(1550,330)]) + '<g data-orbit="" opacity=".17" stroke="#68beff"><ellipse cx="1240" cy="480" rx="240" ry="95" transform="rotate(-18 1240 480)"/><circle cx="1000" cy="480" r="4" fill="#98d8ff"/></g>')

# Reduce geographic detail while retaining the source boundary shape.
data = json.loads(Path(sys.argv[1]).read_text())
country = next(f for f in data["features"] if f["properties"]["ADMIN"] == "India")


def simplify(points, epsilon=.017):
    if len(points) < 3:
        return points
    ax, ay = points[0]
    bx, by = points[-1]
    length = math.hypot(bx-ax, by-ay)
    distances = [abs((bx-ax)*(ay-y)-(ax-x)*(by-ay))/length if length else math.hypot(x-ax,y-ay) for x,y in points]
    index = max(range(len(points)), key=distances.__getitem__)
    if distances[index] <= epsilon:
        return [points[0],points[-1]]
    return simplify(points[:index+1],epsilon)[:-1] + simplify(points[index:],epsilon)


polygons = [simplify(p[0]) for p in country["geometry"]["coordinates"]]
all_points = [p for ring in polygons for p in ring]
min_x,max_x = min(p[0] for p in all_points),max(p[0] for p in all_points)
min_y,max_y = min(p[1] for p in all_points),max(p[1] for p in all_points)
W,H = 680,720
scale = min(570 / ((max_x-min_x)*.93),625 / (max_y-min_y))
offset_x = (W-(max_x-min_x)*.93*scale)/2
offset_y = 34


def project(point):
    x,y = point
    return (offset_x+(x-min_x)*.93*scale,offset_y+(max_y-y)*scale)


shapes = [[project(p) for p in ring] for ring in polygons]
d = ' '.join('M'+'L'.join(f'{x:.1f},{y:.1f}' for x,y in ring)+'Z' for ring in shapes if len(ring)>2)
mask_large = Image.new('L',(W*2,H*2))
md = ImageDraw.Draw(mask_large)
for ring in shapes:
    if len(ring)>2:
        md.polygon([(round(x*2),round(y*2)) for x,y in ring],fill=255)
mask = mask_large.resize((W,H),Image.Resampling.LANCZOS)
face = Image.new('RGBA',(W,H))
pixels = face.load()
for y in range(H):
    for x in range(W):
        light = .5+.5*math.sin(x/W*2.7+y/H*1.9)
        pixels[x,y] = (round(4+5*light),round(26+31*light),round(65+65*light),mask.getpixel((x,y)))
shadow = Image.new('RGBA',(W,H),(11,75,159,0))
shadow.putalpha(mask.filter(ImageFilter.GaussianBlur(17)).point(lambda p:round(p*.32)))
base = shadow.copy()
depth = Image.new('RGBA',(W,H),(5,33,79,255))
depth.putalpha(mask)
base.alpha_composite(depth,(0,7))
base.alpha_composite(face)
bevel = Image.new('RGBA',(W,H),(70,186,255,255))
bevel.putalpha(ImageChops.subtract(mask,ImageChops.offset(mask,2,3)).point(lambda p:round(p*.8)))
base.alpha_composite(bevel)
draw = ImageDraw.Draw(base)
for ring in shapes:
    if len(ring)>2:
        draw.line(ring,fill=(82,186,250,210),width=2)

random.seed(82)
points=[]
while len(points)<45:
    point=(random.randint(70,W-65),random.randint(70,H-90))
    if mask.getpixel(point)>250 and all(math.dist(point,p)>37 for p in points):
        points.append(point)
edges=set()
for i,a in enumerate(points):
    closest=sorted(range(len(points)),key=lambda j: math.dist(a,points[j]))[1:4]
    for j in closest:
        if math.dist(a,points[j])<160:
            edges.add(tuple(sorted((i,j))))
edges=sorted(edges)
for i,j in edges:
    draw.line([points[i],points[j]],fill=(36,100,159,230),width=1)
for x in range(62,W,16):
    for y in range(48,H-55,16):
        if mask.getpixel((x,y))>250:
            draw.ellipse((x-.5,y-.5,x+.5,y+.5),fill=(30,82,139,245))
for i,(x,y) in enumerate(points):
    draw.ellipse((x-2,y-2,x+2,y+2),fill=(95,190,245,245))

orange={4,11,19,27,34,41}
orange_order={node:index for index,node in enumerate(sorted(orange))}


def smooth(value):
    value=max(0,min(1,value))
    return value*value*(3-2*value)


frames=[]
for frame in range(60):
    time=frame/60
    lights=Image.new('RGBA',(W,H))
    ld=ImageDraw.Draw(lights)
    # 2-4 s: staggered connections brighten softly, without moving the map.
    for e,(i,j) in enumerate(edges):
        brightness=math.exp(-((time-(.24+(e%7)*.023))/.055)**2)
        if brightness>.02:
            ld.line([points[i],points[j]],fill=(85,181,255,round(brightness*135)),width=1)
    for i,(x,y) in enumerate(points):
        pulse=.5+.5*math.sin(2*math.pi*(time*(1+i%3)+i*.137))
        # 0-2 s: blue nodes emerge; 4-6 s: independent orange pulses;
        # 6-8 s: blue twinkles. The envelope returns smoothly at 10 s.
        emerge=.4+.6*smooth((time-(i%5)*.016)/.13)
        settle=1-.6*smooth((time-.82)/.18)
        if i in orange:
            pulse=.18*pulse+.82*math.exp(-((time-(.43+orange_order[i]*.028))/.045)**2)
            strength=.5+.5*pulse
        else:
            twinkle=math.exp(-((time-(.62+(i*.137%1)*.16))/.025)**2)
            pulse=.3*pulse+.7*twinkle
            strength=min(emerge,settle)*(.5+.5*pulse)
        color=(255,162,65) if i in orange else (85,193,255)
        radius=3.5+pulse*(3.5 if i in orange else 1.1)
        ld.ellipse((x-radius,y-radius,x+radius,y+radius),fill=(*color,round(65+strength*170)))
    # 8-10 s: three small signals travel, then fade before the loop restarts.
    for order,e in enumerate([3,17,29]):
        i,j=edges[e]
        t=(time-(.8+order*.025))/.14
        if not 0<t<1:
            continue
        x=points[i][0]*(1-t)+points[j][0]*t
        y=points[i][1]*(1-t)+points[j][1]*t
        ld.ellipse((x-2,y-2,x+2,y+2),fill=(222,244,255,round(math.sin(math.pi*t)*230)))
    result=base.copy()
    result.alpha_composite(lights.filter(ImageFilter.GaussianBlur(7)))
    result.alpha_composite(lights)
    frames.append(result)
frames[0].save(OUT/'projects-india-poster.webp',quality=90,method=6)
frames[0].save(OUT/'projects-india-network.webp',save_all=True,append_images=frames[1:],duration=[167,167,166]*20,loop=0,quality=70,method=4,kmin=9,kmax=17)

silhouette=f'<defs><linearGradient id="indiaBlue" x2="1" y2="1"><stop stop-color="#1b78c6"/><stop offset="1" stop-color="#092d78"/></linearGradient></defs><path d="{d}" fill="url(#indiaBlue)" stroke="#65c1ff" stroke-width="1.5"/>'
svg('india-silhouette.svg',silhouette,f'0 0 {W} {H}')
network='<g stroke="#79bfff" opacity=".28">'+''.join(f'<path d="M{points[i][0]},{points[i][1]}L{points[j][0]},{points[j][1]}"/>' for i,j in edges[::3])+'</g>'
network+=''.join(f'<circle cx="{points[i][0]}" cy="{points[i][1]}" r="7" fill="none" stroke="#ff9858" stroke-width="1" data-pulse=""/>' for i in sorted(orange))
network+=''.join(f'<path d="M{points[edges[e][0]][0]},{points[edges[e][0]][1]}L{points[edges[e][1]][0]},{points[edges[e][1]][1]}" pathLength="1" stroke="#8dd4ff" stroke-width="1.8" data-signal=""/>' for e in [3,17,29])
svg('india-network-overlay.svg',network,f'0 0 {W} {H}')
print(json.dumps({"frames":60,"duration_ms":10000,"animated_bytes":(OUT/'projects-india-network.webp').stat().st_size,"poster_bytes":(OUT/'projects-india-poster.webp').stat().st_size,"nodes":len(points)}))
