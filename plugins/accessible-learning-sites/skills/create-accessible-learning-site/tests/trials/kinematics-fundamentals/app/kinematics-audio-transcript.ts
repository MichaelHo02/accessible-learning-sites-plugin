import type { TranscriptCue } from "./components/accessible-interactions";

export const kinematicsAudioCues = [
  {
    "id": "lecture-cue-0001",
    "startSeconds": 0.23,
    "timestamp": "00:00",
    "speaker": "Lecturer",
    "text": "[Unclear opening words.] This topic involves the motion of a body; that is the purpose of kinematics. We have two kinds of problems. First: motion in one dimension.",
    "note": "The first few words are not recoverable confidently from the automatic transcript."
  },
  {
    "id": "lecture-cue-0002",
    "startSeconds": 23.196,
    "timestamp": "00:23",
    "speaker": "Lecturer",
    "text": "Motion in one dimension means motion along a straight line. Secondly, we will discuss motion in two dimensions—for example, throwing an object so that it follows a curved path in a plane."
  },
  {
    "id": "lecture-cue-0003",
    "startSeconds": 45.364,
    "timestamp": "00:45",
    "speaker": "Lecturer",
    "text": "At any instant, the position of the body can be specified by two coordinates, x and y. That is why this is two-dimensional motion. Is the plan clear? First, motion in one dimension: motion in a straight line. Let me review some important points before we move on. Last week, when we discussed motion in one dimension, we first defined displacement. Displacement is the change in…"
  },
  {
    "id": "lecture-cue-0004",
    "startSeconds": 83.13,
    "timestamp": "01:23",
    "speaker": "Lecturer and students",
    "text": "Student: Position. Lecturer: Position, right. For example, at one time the object is at position A and later it moves to position B. The displacement is measured from A to B."
  },
  {
    "id": "lecture-cue-0005",
    "startSeconds": 117.596,
    "timestamp": "01:57",
    "speaker": "Lecturer",
    "text": "Then we define average velocity. Average velocity is the change in position—displacement—divided by the elapsed time. The graphical…"
  },
  {
    "id": "lecture-cue-0006",
    "startSeconds": 139.746,
    "timestamp": "02:19",
    "speaker": "Lecturer and students",
    "text": "…interpretation of average velocity can be shown as follows. Consider two positions, A and B. The displacement between these positions is the vertical change on the position–time graph."
  },
  {
    "id": "lecture-cue-0007",
    "startSeconds": 160.89,
    "timestamp": "02:40",
    "speaker": "Lecturer",
    "text": "Divide the displacement from A to B by the elapsed time from A to B. This ratio is the slope of the line connecting points A and B, called a secant line. A secant line connects two points. To compute average velocity over another interval, such as A to C, calculate the slope of that secant line in the same way."
  },
  {
    "id": "lecture-cue-0008",
    "startSeconds": 198.926,
    "timestamp": "03:18",
    "speaker": "Lecturer",
    "text": "Average velocity tells us the overall rate of motion from point A to point B, but it does not show how velocity varies during that interval. To describe that variation, what must we define?"
  },
  {
    "id": "lecture-cue-0009",
    "startSeconds": 220.726,
    "timestamp": "03:40",
    "speaker": "Lecturer and students",
    "text": "We need to define instantaneous velocity: the velocity at each instant. Mathematically, instantaneous velocity is the limit of the change in position divided by the elapsed time…"
  },
  {
    "id": "lecture-cue-0010",
    "startSeconds": 247.86,
    "timestamp": "04:07",
    "speaker": "Lecturer",
    "text": "…as Δt approaches zero. This limit is the derivative dx/dt. In other words, velocity is the derivative of position with respect to time. Now consider its graphical interpretation."
  },
  {
    "id": "lecture-cue-0011",
    "startSeconds": 274.222,
    "timestamp": "04:34",
    "speaker": "Lecturer and students",
    "text": "The slope of the secant line from A to B gives the average velocity. As we take the limit Δt → 0, the second point moves closer and closer to point A."
  },
  {
    "id": "lecture-cue-0012",
    "startSeconds": 297.972,
    "timestamp": "04:57",
    "speaker": "Lecturer and students",
    "text": "The secant line becomes a tangent line. Instantaneous velocity is the slope of that tangent line at the chosen point."
  },
  {
    "id": "lecture-cue-0013",
    "startSeconds": 324.692,
    "timestamp": "05:24",
    "speaker": "Lecturer and students",
    "text": "How can we determine the instantaneous velocity at point B graphically from this plot? Student: It is…"
  },
  {
    "id": "lecture-cue-0014",
    "startSeconds": 345.942,
    "timestamp": "05:45",
    "speaker": "Lecturer and students",
    "text": "Student: The tangent line at B. Lecturer: More precisely, it is the slope of the tangent line. The slope of the tangent line at point A gives the instantaneous velocity at A."
  },
  {
    "id": "lecture-cue-0015",
    "startSeconds": 374.836,
    "timestamp": "06:14",
    "speaker": "Lecturer",
    "text": "Let me draw the tangent line clearly. Its slope at A is the tangent of the angle shown, so vA is…"
  },
  {
    "id": "lecture-cue-0016",
    "startSeconds": 401.748,
    "timestamp": "06:41",
    "speaker": "Lecturer",
    "text": "…the slope here, tan αA. The same method gives the velocity at point B."
  },
  {
    "id": "lecture-cue-0017",
    "startSeconds": 422.798,
    "timestamp": "07:02",
    "speaker": "Lecturer and students",
    "text": "At point B, the tangent is approximately horizontal, so its slope and instantaneous velocity are zero. What does that tell us about the motion?"
  },
  {
    "id": "lecture-cue-0018",
    "startSeconds": 443.186,
    "timestamp": "07:23",
    "speaker": "Lecturer and students",
    "text": "Student: The car stops. Lecturer: It stops and changes direction. On the position axis, the car moves towards point B and then reverses direction. To change direction, it first comes momentarily to rest."
  },
  {
    "id": "lecture-cue-0019",
    "startSeconds": 467.412,
    "timestamp": "07:47",
    "speaker": "Lecturer and students",
    "text": "The instantaneous velocity at point C is found in the same way: from the slope of the tangent line at C."
  },
  {
    "id": "lecture-cue-0020",
    "startSeconds": 490.35,
    "timestamp": "08:10",
    "speaker": "Lecturer",
    "text": "Let the tangent angle at C be αC; the velocity vC equals the tangent slope there. In summary, velocity is the derivative of position with respect to time."
  },
  {
    "id": "lecture-cue-0021",
    "startSeconds": 514.71,
    "timestamp": "08:34",
    "speaker": "Lecturer",
    "text": "Graphically, velocity is the slope of the tangent line at the point. Velocity can also change during the motion. The rate of change of velocity with respect to time gives us…"
  },
  {
    "id": "lecture-cue-0022",
    "startSeconds": 549.676,
    "timestamp": "09:09",
    "speaker": "Lecturer and students",
    "text": "…acceleration. The rate of change of position with time gives velocity. Going one step further, the rate of change of velocity with time gives acceleration. For example, consider driving a car."
  },
  {
    "id": "lecture-cue-0023",
    "startSeconds": 577.524,
    "timestamp": "09:37",
    "speaker": "Lecturer and students",
    "text": "Step harder on the gas pedal and the car’s velocity increases. The change in velocity per unit time is acceleration."
  },
  {
    "id": "lecture-cue-0024",
    "startSeconds": 598.324,
    "timestamp": "09:58",
    "speaker": "Lecturer",
    "text": "The velocity…"
  },
  {
    "id": "lecture-cue-0025",
    "startSeconds": 600.604,
    "timestamp": "10:00",
    "speaker": "Lecturer and students",
    "text": "…increases under the gas pedal. If you apply the brakes, the car slows down; its velocity decreases."
  },
  {
    "id": "lecture-cue-0026",
    "startSeconds": 621.204,
    "timestamp": "10:21",
    "speaker": "Lecturer",
    "text": "In both cases velocity is changing. The change in velocity with respect to time is defined as acceleration."
  },
  {
    "id": "lecture-cue-0027",
    "startSeconds": 644.504,
    "timestamp": "10:44",
    "speaker": "Lecturer and students",
    "text": "Recall that average velocity is the change in position divided by elapsed time: v̄ = Δx/Δt."
  },
  {
    "id": "lecture-cue-0028",
    "startSeconds": 666.616,
    "timestamp": "11:06",
    "speaker": "Lecturer",
    "text": "Average acceleration is the change in velocity divided by elapsed time: ā = Δv/Δt = (vf − vi)/(tf − ti), where f means final and i means initial."
  },
  {
    "id": "lecture-cue-0029",
    "startSeconds": 688.016,
    "timestamp": "11:28",
    "speaker": "Lecturer",
    "text": "For an average quantity, we normally place a bar over the symbol, as in v̄ for average velocity and ā for average acceleration. This notation is common in physics."
  },
  {
    "id": "lecture-cue-0030",
    "startSeconds": 710.462,
    "timestamp": "11:50",
    "speaker": "Lecturer and students",
    "text": "Why are we interested in acceleration? Next week, in kinetics, we will relate motion quantities such as displacement, velocity, and acceleration to force using Newton’s second law, which connects force and acceleration."
  },
  {
    "id": "lecture-cue-0031",
    "startSeconds": 747.348,
    "timestamp": "12:27",
    "speaker": "Lecturer",
    "text": "If a force is applied to an object and we want to study its motion, Newton’s second law gives the acceleration. From acceleration, we can determine velocity and displacement at each instant."
  },
  {
    "id": "lecture-cue-0032",
    "startSeconds": 769.198,
    "timestamp": "12:49",
    "speaker": "Lecturer and students",
    "text": "As with velocity, acceleration may be average or instantaneous. Instantaneous velocity is the limit of average velocity as Δt approaches…"
  },
  {
    "id": "lecture-cue-0033",
    "startSeconds": 795.064,
    "timestamp": "13:15",
    "speaker": "Lecturer and students",
    "text": "…zero. Instantaneous acceleration is obtained in the same way: take the limit of average acceleration as Δt → 0."
  },
  {
    "id": "lecture-cue-0034",
    "startSeconds": 821.318,
    "timestamp": "13:41",
    "speaker": "Lecturer and students",
    "text": "When Δt approaches zero, Δv/Δt becomes the derivative of velocity with respect to time, dv/dt. Keep the notation distinction in mind."
  },
  {
    "id": "lecture-cue-0035",
    "startSeconds": 841.77,
    "timestamp": "14:01",
    "speaker": "Lecturer",
    "text": "The symbol ā denotes average acceleration. The symbol a without a bar denotes instantaneous acceleration: acceleration is the derivative of velocity with respect to time."
  },
  {
    "id": "lecture-cue-0036",
    "startSeconds": 869.286,
    "timestamp": "14:29",
    "speaker": "Lecturer",
    "text": "Acceleration is the derivative of velocity with respect to time."
  },
  {
    "id": "lecture-cue-0037",
    "startSeconds": 906.708,
    "timestamp": "15:06",
    "speaker": "Lecturer and students",
    "text": "These illustrations show three acceleration cases. The first shows motion with uniform, constant velocity."
  },
  {
    "id": "lecture-cue-0038",
    "startSeconds": 932.746,
    "timestamp": "15:32",
    "speaker": "Lecturer and students",
    "text": "The car moves at constant velocity; every velocity arrow has the same magnitude and direction. What is the acceleration? Students: Zero."
  },
  {
    "id": "lecture-cue-0039",
    "startSeconds": 952.896,
    "timestamp": "15:52",
    "speaker": "Lecturer and students",
    "text": "Correct. Acceleration is the derivative of velocity. Constant velocity does not change, so its derivative and acceleration are zero. In the second case, the car speeds up."
  },
  {
    "id": "lecture-cue-0040",
    "startSeconds": 977.444,
    "timestamp": "16:17",
    "speaker": "Lecturer and students",
    "text": "As the car speeds up in the chosen positive direction, the velocity-vector magnitude increases. Is acceleration positive or negative? Students: Positive. The derivative of an increasing velocity is positive, so acceleration is…"
  },
  {
    "id": "lecture-cue-0041",
    "startSeconds": 1010.062,
    "timestamp": "16:50",
    "speaker": "Lecturer and students",
    "text": "…positive. Here rightward motion is the chosen positive direction. When the driver applies the brakes, velocity begins…"
  },
  {
    "id": "lecture-cue-0042",
    "startSeconds": 1036.974,
    "timestamp": "17:16",
    "speaker": "Lecturer and students",
    "text": "Students: Decreasing. Lecturer: Correct. In the third case, the velocity magnitude decreases. What is the derivative of a decreasing velocity function?"
  },
  {
    "id": "lecture-cue-0043",
    "startSeconds": 1058.926,
    "timestamp": "17:38",
    "speaker": "Lecturer and students",
    "text": "The acceleration is negative—directed left under this sign convention. In summary, remember the relationship between displacement, velocity, and acceleration. Start with displacement…"
  },
  {
    "id": "lecture-cue-0044",
    "startSeconds": 1082.212,
    "timestamp": "18:02",
    "speaker": "Lecturer and students",
    "text": "Differentiate displacement with respect to time to obtain velocity. Differentiate velocity with respect to time to obtain what?"
  },
  {
    "id": "lecture-cue-0045",
    "startSeconds": 1103.432,
    "timestamp": "18:23",
    "speaker": "Lecturer and students",
    "text": "Student: Acceleration. Lecturer: Correct. If you took mathematics last semester, these derivatives and integrations should be familiar. If you have not yet taken Engineering Mathematics, watch the two Canvas videos on the meaning of differentiation and integration."
  },
  {
    "id": "lecture-cue-0046",
    "startSeconds": 1137.424,
    "timestamp": "18:57",
    "speaker": "Lecturer and students",
    "text": "The videos emphasise the geometric meaning of differentiation and integration. Now consider a special case of one-dimensional motion."
  },
  {
    "id": "lecture-cue-0047",
    "startSeconds": 1163.732,
    "timestamp": "19:23",
    "speaker": "Lecturer",
    "text": "in which you have acceleration is constant. Acceleration is constant. For example, okay, we consider an object in free fall near earth's surface, right? And w oh for example, when you throw an object, right? Due to the effect of gravitational acceleration of the earth, right?"
  },
  {
    "id": "lecture-cue-0048",
    "startSeconds": 1189.588,
    "timestamp": "19:49",
    "speaker": "Lecturer",
    "text": "The acceleration on your body on your object will be the gravitational acceleration, right. But if g is pointing downward, nine point eight"
  },
  {
    "id": "lecture-cue-0049",
    "startSeconds": 1200,
    "timestamp": "20:00",
    "speaker": "Lecturer and students",
    "text": "it one metre per second square, right. And if and to make it simple, we neglect the air resistance. We neglect the air resistance here the Student: You make Lecturer: the Student: me trip. Lecturer: resistance. That is an important point. Now, for example, when you throw down a ball like that, right, that is experiment. And"
  },
  {
    "id": "lecture-cue-0050",
    "startSeconds": 1222.95,
    "timestamp": "20:22",
    "speaker": "Lecturer and students",
    "text": "Okay, so Okay, I will let you watch this video first, okay? Student: Mm-hmm. So it's a very Lecturer: back to the basic. Student: basic basic. So now we know Oh, still not good enough, okay. Student: Still not good. Lecturer: Okay, so if I have a two bodies, right?"
  },
  {
    "id": "lecture-cue-0051",
    "startSeconds": 1246.988,
    "timestamp": "20:46",
    "speaker": "Lecturer and students",
    "text": "one is heavier than another one. Student: Mm-hmm. Lecturer: And I'm going to throw them down without any initial velocity. And I neglect the air resistance. Can you tell can you guess which one we touch the ground earlier?"
  },
  {
    "id": "lecture-cue-0052",
    "startSeconds": 1268.326,
    "timestamp": "21:08",
    "speaker": "Lecturer and students",
    "text": "Student: Well, Student: None. Student: it it Lecturer: The same, right? Why is that? Student: Ah. Lecturer: Because some people think that they hate they hate hate their one with a touch of the the ground earlier, right? Student: No way. Student: But there's this book that shouldn't that the air system is electrical. That problem for our standard. Lecturer: Very good, we neglect the air resistance, right?"
  },
  {
    "id": "lecture-cue-0053",
    "startSeconds": 1288.656,
    "timestamp": "21:28",
    "speaker": "Lecturer and students",
    "text": "Student: Mm-hmm. Lecturer: Okay, first okay, we in science we need to do two steps. Alright, first we do experiment. And then like that like I see two bodies whether they touch the ground At the same time, right? And then we need to prove it mathematically, right?"
  },
  {
    "id": "lecture-cue-0054",
    "startSeconds": 1310.578,
    "timestamp": "21:50",
    "speaker": "Lecturer",
    "text": "The time for two body touch the ground to be the same, right? Two set, we experiment and we in competitions. Let's set. Okay, I I let you watch the for this video about the experiment throwing out two bodies. Okay, where is it?"
  },
  {
    "id": "lecture-cue-0055",
    "startSeconds": 1331.22,
    "timestamp": "22:11",
    "speaker": "Lecturer",
    "text": "There we go."
  },
  {
    "id": "lecture-cue-0056",
    "startSeconds": 1353.076,
    "timestamp": "22:33",
    "speaker": "Video narrator and class",
    "text": "This is NASA's Space Power Facility in Cleveland Ohio and it is the world's biggest vacuum chamber. It's huge to test spacecraft in conditions of outer space. And it does that by pumping out the thirty tons of air from this chamber until there are about two grams left."
  },
  {
    "id": "lecture-cue-0057",
    "startSeconds": 1375.316,
    "timestamp": "22:55",
    "speaker": "Video narrator and class",
    "text": "I've got an eccentric construction of this history. It was built in the 1960s as a nuclear test facility to test nuclear propulsion systems. And that meant that they built it out of aluminium to make the radiation easier to deal with. Aluminium is not the best thing, the strongest material to build a vacuum chamber out of. So they built an outer concrete skin which you can't radiation."
  },
  {
    "id": "lecture-cue-0058",
    "startSeconds": 1402.09,
    "timestamp": "23:22",
    "speaker": "Video narrator and class",
    "text": "and parts and external pressure vessel, so that this thing can take the force that's pressing on the outside when it's pumped out to the conditions of outer space. The outer volume line, the one is helium, and the one is galvanic, is inside, because it's simple. It's a heavy object and a light one."
  },
  {
    "id": "lecture-cue-0059",
    "startSeconds": 1426.652,
    "timestamp": "23:46",
    "speaker": "Video narrator and class",
    "text": "and drop it at the same time to see which fell fastest. Lecturer: Which one is faster, which one touch Student: The Lecturer: the ground? Student: ball. Lecturer: The Student: That Lecturer: ball. Student: ball. Lecturer: The ball, right? Student: Yes. Student: So if focus is like the there's still air resistance into the vacuum."
  },
  {
    "id": "lecture-cue-0060",
    "startSeconds": 1449.202,
    "timestamp": "24:09",
    "speaker": "Video narrator and class",
    "text": "Very good. Lecturer: We still have the air resistance in this experiment, right? Student: Yeah. Student: Yeah. Lecturer: In order to neglect the air resistance, we need to do what? Student: So careful Student: So careful Student: So careful. Student: of the other. Lecturer: right? And we need to have a vacuum environment, right? Student: Yeah. Lecturer: Right? Okay, so that is the first experiment right, we have the air resistance. Now I would like to have to have a experiment in the condition without"
  },
  {
    "id": "lecture-cue-0061",
    "startSeconds": 1474.448,
    "timestamp": "24:34",
    "speaker": "Video narrator and class",
    "text": "Lecturer: air resistance, right? Video narrator: How in this case the feathers fell to the ground at a slower rate than the bowling ball, because of air resistance. Student: Great. Video narrator: So in order to see the true nature of gravity, we have to remove the air."
  },
  {
    "id": "lecture-cue-0062",
    "startSeconds": 1501.342,
    "timestamp": "25:01",
    "speaker": "Video narrator and class",
    "text": "Student: Ah, we are going to remove the air, right? Video narrator: It takes three hours to put back the eight hundred thousand cubic feet of air through the chamber."
  },
  {
    "id": "lecture-cue-0063",
    "startSeconds": 1523.562,
    "timestamp": "25:23",
    "speaker": "Video narrator and class",
    "text": "Student: Okay, we drop two millitor in the last thirty minutes. But once it's complete, Video narrator: there's a near perfect vacuum inside. Student: 61 fourth annual 10% holding. Station one, go for drop. PCP 30-1, pressure set point at 240 PSI. We are go for drop."
  },
  {
    "id": "lecture-cue-0064",
    "startSeconds": 1547.956,
    "timestamp": "25:47",
    "speaker": "Student",
    "text": "Seven, six, five, four, down to one, two, one, release."
  },
  {
    "id": "lecture-cue-0065",
    "startSeconds": 1597.748,
    "timestamp": "26:37",
    "speaker": "Video narrator and class",
    "text": "Exactly what Echo said, exactly what Lecturer: It's Video narrator: he said. Lecturer: like a bird. Video narrator: Those are long. No. Look at that. That's just brilliant. Isaac Newton was saying that the ball and the feather fall because there's a force pulling them down. Gravity."
  },
  {
    "id": "lecture-cue-0066",
    "startSeconds": 1619.098,
    "timestamp": "26:59",
    "speaker": "Video narrator and class",
    "text": "But Einstein imagined the scene very differently. The happiest thoughts of his life. Was this the reason for Boeing's ball falling together is because they're not falling. They're standing still. There is no force acting on them at all."
  },
  {
    "id": "lecture-cue-0067",
    "startSeconds": 1644.472,
    "timestamp": "27:24",
    "speaker": "Video narrator and class",
    "text": "So he reasoned that if he couldn't see the background, that"
  },
  {
    "id": "lecture-cue-0068",
    "startSeconds": 1668.532,
    "timestamp": "27:48",
    "speaker": "Lecturer",
    "text": "Two bogies will be pulled down the same speed, right? Such ground simultaneously at the same time, right? This by the experiment. Right now we need to have to need to quantify the phenomenon, right? Let's try to count the time for two bogies to touch the ground"
  },
  {
    "id": "lecture-cue-0069",
    "startSeconds": 1689.782,
    "timestamp": "28:09",
    "speaker": "Lecturer",
    "text": "and let's see whether two timing table really the same. Right? Okay. Going back to the motion with constant acceleration. Now we need to derive kinematic equations. By kinematic equations actually we would like to derive relations between accelerations, velocity and displacement, right? Okay, now we start from acceleration and then we need to derive"
  },
  {
    "id": "lecture-cue-0070",
    "startSeconds": 1725.716,
    "timestamp": "28:45",
    "speaker": "Lecturer",
    "text": "Expression for the velocity. Okay, so you have a given acceleration is constant. I think in the experiment here the acceleration is constant, I forget that, but is the gravitational acceleration, right? It is constant, and now we actually drive expression for the velocity and the displacement actually. Alright. Okay, by simple, here's the gamma rate gamma raises."
  },
  {
    "id": "lecture-cue-0071",
    "startSeconds": 1749.966,
    "timestamp": "29:09",
    "speaker": "Lecturer and students",
    "text": "Alright. Okay. Now, we start with the p the the the average accelerations, okay alright. this is okay, I forgot to put mine here. But it doesn't matter, right, because it acceler acceleration is constant, right? Student: Exactly. Lecturer: And I just choose initial time, T_I_ equal zero. Alright? So this one is zero."
  },
  {
    "id": "lecture-cue-0072",
    "startSeconds": 1776.82,
    "timestamp": "29:36",
    "speaker": "Lecturer",
    "text": "And I denote the time when I would like to computer the velocity is T_ and when it becomes T_ right? And then the initial velocity let's try to denote it by V_ naught. Right? In physics, when we use V_ sub-naught of these zeros, it means that initial value, right? A T_"
  },
  {
    "id": "lecture-cue-0073",
    "startSeconds": 1801.492,
    "timestamp": "30:01",
    "speaker": "Lecturer",
    "text": "and we would like to denote the velocity, finally, at time T is the Right? And then it's when it's constant, right? And then we are able to derive expressions for V, correct? So from here you have the axis constant, right? That is when it's constant."
  },
  {
    "id": "lecture-cue-0074",
    "startSeconds": 1824.142,
    "timestamp": "30:24",
    "speaker": "Lecturer and students",
    "text": "Yeah, constant. Then you have what? You have A times T equals what? Student: Mm-hmm. Lecturer: I just multiply by A by the denominator, right? The denominator now becomes T_ over here, right? So A times T_ equals the numerator. The numerator is V_ Student: V_ minus V_ zero."
  },
  {
    "id": "lecture-cue-0075",
    "startSeconds": 1845.146,
    "timestamp": "30:45",
    "speaker": "Lecturer and students",
    "text": "minus Student: V_ Yes. Lecturer: naught. And you keep in mind that we know acceleration. Right? We know the initial velocity. And we know that instant tea when you would like to compute the velocity, and our purpose is we would like to compute the velocity here alright."
  },
  {
    "id": "lecture-cue-0076",
    "startSeconds": 1866.696,
    "timestamp": "31:06",
    "speaker": "Lecturer and students",
    "text": "So we have only one unknown for one equation, so right. Now, how do we compute v? It very simple right? From that equation you have that the velocity v equals Student: Eight D. Lecturer: V_ north plus H_ H_ very good. That is the expression to compare the velocity when acceleration is constant. Again note that acceleration is constant. That is an important point. Student: Yeah."
  },
  {
    "id": "lecture-cue-0077",
    "startSeconds": 1897.736,
    "timestamp": "31:37",
    "speaker": "Lecturer",
    "text": "A_S_ is constant. If A_S_ is not constant, this equation is not valid, right? Hit my last point. Alright. now I would like to discuss the graphical graphical interpretations of the results we have. True, we know that velocity equals initial velocity plus a times t, right? Now let's try to use"
  },
  {
    "id": "lecture-cue-0078",
    "startSeconds": 1933.372,
    "timestamp": "32:13",
    "speaker": "Lecturer",
    "text": "The background are acceleration and velocity to to drive gas e equations, right? It's more than two entities. Okay, so now I'm going to plot acceleration and velocity versus time. Okay. So when the acceleration is constant, this can be plotted as a horizontal line, right?"
  },
  {
    "id": "lecture-cue-0079",
    "startSeconds": 1958.372,
    "timestamp": "32:38",
    "speaker": "Lecturer and students",
    "text": "Student: Yes. Lecturer: The value of that. That's I said it isn't the same every time, right? Student: Yes. Lecturer: Yeah. Okay, very good. This mean that the slope is zero, right? Now, we would like we are going to use the relation between the velocity and acceleration, right? Okay, if the derivative of the velocity is acceleration, so if acceleration is constant, what what happen with the velocity?"
  },
  {
    "id": "lecture-cue-0080",
    "startSeconds": 1991.316,
    "timestamp": "33:11",
    "speaker": "Lecturer and students",
    "text": "Okay, so to use a that's French, right. I have the slope of the velocity. This devi over detail, right. Student: Yeah. Lecturer: It's acceleration. And now this game acceleration is constant. What happen with the function velocity? Student: 18 because Lecturer: It ought to have the derivative is constant, that function must be"
  },
  {
    "id": "lecture-cue-0081",
    "startSeconds": 2016.366,
    "timestamp": "33:36",
    "speaker": "Lecturer and students",
    "text": "Student: No, I Lecturer: Linear, right? Student: Yeah, yeah. Yeah. Lecturer: Play linear. So this is linear. And when you block a linear function, you have a straight line, right? Student: Yes. Yes. Student: Yes. Lecturer: Straight. So, this that straight line can be blocked this way. Yeah, the blocked thing is a straight line and you have a slope, a slope,"
  },
  {
    "id": "lecture-cue-0082",
    "startSeconds": 2036.878,
    "timestamp": "33:56",
    "speaker": "Lecturer and students",
    "text": "slope of the veloc the velocity is A. I celebrate it, Student: Yes. Lecturer: right. And what is the geometric meaning of the slope? What Student: Lecturer: is Student: rise Lecturer: tan Student: over Lecturer: of this angle, right? Student: Yes. Lecturer: So you can have tan of this angle alpha equals A_ right?"
  },
  {
    "id": "lecture-cue-0083",
    "startSeconds": 2057.076,
    "timestamp": "34:17",
    "speaker": "Lecturer",
    "text": "Now, in order to from V_ from v₀, you look at this one. The zeta, okay, this over R_C, the velocity at T equals zero, right, here's the initial velocity, and then the velocity increases, right, linearly. And at any time T, we would like to compute the velocity at that time, it means that we would like to compute this length, right?"
  },
  {
    "id": "lecture-cue-0084",
    "startSeconds": 2081.382,
    "timestamp": "34:41",
    "speaker": "Lecturer and students",
    "text": "Look at this figure you can see that this one has two parts, right? This one is v₀. And this one is Student: Lecturer: eight times T_ right? Yeah? what this one is eight times T_ Student: Eight times T_ Lecturer: The top one. Student: is Lecturer: The bottom one is mean not fossil, right? It's constant. The same as initial velocity."
  },
  {
    "id": "lecture-cue-0085",
    "startSeconds": 2106.406,
    "timestamp": "35:06",
    "speaker": "Lecturer and students",
    "text": "I'm asking you why this length is eight times T_ Student: Ten. Sheen. Sheen. Sheen. The change in velocity, the different in velocity. Lecturer: Okay, go go ahead. Student: Yeah, because you had to release of that our V_o_t Lecturer: is A and is also a constant. And we could say that integration of a constant must be"
  },
  {
    "id": "lecture-cue-0086",
    "startSeconds": 2132.846,
    "timestamp": "35:32",
    "speaker": "Lecturer",
    "text": "Yeah, it it is right. But I would like to have an easier explanation. A shorter one. using the graphic interpretation, just using geometry. And and what else? Okay, going."
  },
  {
    "id": "lecture-cue-0087",
    "startSeconds": 2162.466,
    "timestamp": "36:02",
    "speaker": "Lecturer and students",
    "text": "This but it's it's not not really clear, right? Or do you you break? Okay, my hint is focused on this right-angle. Student: You know, that might be a little weird. I have to look up. Lecturer: This is a right-angle, right? So we hide behind this one."
  },
  {
    "id": "lecture-cue-0088",
    "startSeconds": 2184.92,
    "timestamp": "36:24",
    "speaker": "Lecturer",
    "text": "That's a right-angle. I denote this one by alpha and I know that the slope of this line, that is The span of these angle equals A_ and I would like to compute I would like to compute these height."
  },
  {
    "id": "lecture-cue-0089",
    "startSeconds": 2206.8,
    "timestamp": "36:46",
    "speaker": "Lecturer and students",
    "text": "Student: You take over here. Lecturer: And I know that the base here is T_ Student: Yes. Do we use the Theoria. Lecturer: So sorry, say that again. Student: Do we use the p Pythagorean theorem? Student: I th I Student: sounds like a coyote. Do we use the beat ticker orient theorem to calculate the height?"
  },
  {
    "id": "lecture-cue-0090",
    "startSeconds": 2226.888,
    "timestamp": "37:06",
    "speaker": "Lecturer and students",
    "text": "Binary theorem of the theorem? Student: Yeah. Student: Mm-hmm. Lecturer: We we can do it, but it is it's quite complicated. Is this another solution easier? Student: we use Lecturer: Try to make our lives simple when you need to solve any problem in your life. Try to start from the simplest one. Go ahead. Student: So are you trying to find the"
  },
  {
    "id": "lecture-cue-0091",
    "startSeconds": 2247.284,
    "timestamp": "37:27",
    "speaker": "Lecturer and students",
    "text": "The size of them Oh, so what if we use like sign? We could also so we can find Student: We we use the opposite, do divide by the adjacent line. Lecturer: Very good. So we can use Student: Oh, that was the only Lecturer: relation Student: thing I was reminded. Lecturer: between these two Student: Lecturer: lengths, right? What happen if we take this one divided by that one? Is equal to this one right?"
  },
  {
    "id": "lecture-cue-0092",
    "startSeconds": 2268.484,
    "timestamp": "37:48",
    "speaker": "Lecturer and students",
    "text": "Student: Yes. Lecturer: Is down of this one right? So you have anthem In that triangle we mean what? In this height, right, I just use height, is the one with large compute for, right, Student: Yes. Lecturer: divided by the base. The base is what? The time T_ right? And then"
  },
  {
    "id": "lecture-cue-0093",
    "startSeconds": 2292.282,
    "timestamp": "38:12",
    "speaker": "Lecturer",
    "text": "the height is eight times T_ right? And then you obtain this one. I you can stay right? And then B we be we not plus A times T right. That is another directions for the velocity right, we can use a joystic. I said."
  },
  {
    "id": "lecture-cue-0094",
    "startSeconds": 2316.036,
    "timestamp": "38:36",
    "speaker": "Lecturer",
    "text": "Okay, now we have the velocity ready. We would like to go ahead to compute the displacement. Oh oh okay, that is our next purpose. We would like to compute the displacement active."
  },
  {
    "id": "lecture-cue-0095",
    "startSeconds": 2336.642,
    "timestamp": "38:56",
    "speaker": "Lecturer and students",
    "text": "Now we are going to give this fact. Okay, so as we have a discuss we can see that the velocity increases linearly. from v node to a certain value we attach theoretically, Student: Mm-hmm. Student: Mm-hmm. Lecturer: so what was the average value of velocity during this"
  },
  {
    "id": "lecture-cue-0096",
    "startSeconds": 2357.312,
    "timestamp": "39:17",
    "speaker": "Lecturer and students",
    "text": "time interval? The average velocity. We wi Student: Of course. Student: Mm-hmm. Lecturer: I Student: Positive. Lecturer: just use a average Student: The Lecturer: velocity, Student: average. Lecturer: yeah, right, I just take v subtracted plus v node divided by Student: Over Lecturer: two, Student: two. Lecturer: right? That is the average velocity. Okay. The height here, you meet the average"
  },
  {
    "id": "lecture-cue-0097",
    "startSeconds": 2383.402,
    "timestamp": "39:43",
    "speaker": "Lecturer and students",
    "text": "velocity. Okay? Student: Yeah. Lecturer: Velocity increases linearly, right? Like a triangle, right? You have the average high basically be the top base plus the"
  },
  {
    "id": "lecture-cue-0098",
    "startSeconds": 2400.212,
    "timestamp": "40:00",
    "speaker": "Lecturer",
    "text": "Bottom place, divide by two, right? With velocity average velocity. Okay, that is V_ bar. Okay, now as the definitions of the average velocity, that is we take the displacement, divide by the two,"
  },
  {
    "id": "lecture-cue-0099",
    "startSeconds": 2421.912,
    "timestamp": "40:21",
    "speaker": "Lecturer and students",
    "text": "and the displacement is the current position Subtracted body in this position, right. Student: Yes. Lecturer: At T equals zero in this position is at X_ not. At current position, you could like to compute this guy, right? That's denoted by X_ Okay, so we would like to compute this guy, and we know this one, right? And here we just use the fat dash. The fat dash"
  },
  {
    "id": "lecture-cue-0100",
    "startSeconds": 2449.358,
    "timestamp": "40:49",
    "speaker": "Lecturer",
    "text": "We have the average velocity equal Δx divided by delta T right? That is the definition of the average velocity right? Now from this equation we are able to compute what? X right? Are we able to compute X? Okay, it's computing X. So then you have X equals what? X nought plus V bar now. V bar is what?"
  },
  {
    "id": "lecture-cue-0101",
    "startSeconds": 2477.588,
    "timestamp": "41:17",
    "speaker": "Lecturer and students",
    "text": "Is this guy right? Student: Yes. Lecturer: v₀ plus V divided by two, v₀ plus V divided by two, right? Times Δt Great?"
  },
  {
    "id": "lecture-cue-0102",
    "startSeconds": 2498.688,
    "timestamp": "41:38",
    "speaker": "Lecturer",
    "text": "Now I would like to express X_ in terms of x₀. v₀, L_T_ and I_ only. I don't want to have a video, right? Because if I use this this expression in order to compute the position of your car, right? I need to know the current velocity, right? The velocity at that time, right?"
  },
  {
    "id": "lecture-cue-0103",
    "startSeconds": 2522.458,
    "timestamp": "42:02",
    "speaker": "Lecturer and students",
    "text": "Student: Yeah. Lecturer: So how how do I eliminate the velocity here? I use The relation Of the velocity and Student: The velocity. Lecturer: Concerns is very good now. I I I will I'm going to use the fact that the velocity is Student: Eight. Lecturer: going back to this one."
  },
  {
    "id": "lecture-cue-0104",
    "startSeconds": 2544.306,
    "timestamp": "42:24",
    "speaker": "Lecturer and students",
    "text": "v₀ plus eight here, right? Student: Yes. Student: Oh, v₀. Lecturer: Plus eight here. Student: Yes. Lecturer: Then I have the fact that okay, X_ equals x₀ plus Okay, v₀ plus v₀ is two v₀, right? Divide it by okay, so"
  },
  {
    "id": "lecture-cue-0105",
    "startSeconds": 2570.192,
    "timestamp": "42:50",
    "speaker": "Lecturer and students",
    "text": "Because and if initially T_ knots is zero, so I can replace Δt by Student: T_ Lecturer: T_ T_ right? Delta T_ equal T_ minus zero, right? Student: Yep. Student: Yes. Lecturer: The frame? Student: Mm-hmm. Lecturer: So then, I I have the final result as that is v₀ T_ plus one over two I_T_ square. Right? That is the expressions for"
  },
  {
    "id": "lecture-cue-0106",
    "startSeconds": 2600.764,
    "timestamp": "43:20",
    "speaker": "Lecturer",
    "text": "the displacement. Okay. Okay then? Okay, in summary, when you have a motion with constant accelerations, you are going to divide a displacements for the velocity."
  },
  {
    "id": "lecture-cue-0107",
    "startSeconds": 2627.85,
    "timestamp": "43:47",
    "speaker": "Lecturer",
    "text": "The velocity is V equals V0 plus a t, right? And here the change of the displacement, because over here when I take X minus X0, I will have the other X, right? That is a displacement as a function of time. And then you if you use that fact you are able to derive expressions for the velocity as a function of displacement."
  },
  {
    "id": "lecture-cue-0108",
    "startSeconds": 2656.33,
    "timestamp": "44:16",
    "speaker": "Lecturer and students",
    "text": "Student: Mm-hmm. Lecturer: So that this one is very straightforward to prove if you start from this equation, I have okay let's see. We have proof this equation around here, right? This equation's around it, right? So now what about this one?"
  },
  {
    "id": "lecture-cue-0109",
    "startSeconds": 2682.442,
    "timestamp": "44:42",
    "speaker": "Lecturer",
    "text": "How will we prove thi this one?"
  },
  {
    "id": "lecture-cue-0110",
    "startSeconds": 2705.908,
    "timestamp": "45:05",
    "speaker": "Lecturer",
    "text": "Okay, the equation given by this equation is as follows. These equations help us to compute what? The velocity at time T_ given acceleration and initial velocity, one. This one have us to compute the displacement as a function of initial velocity, acceleration and time T, right? This one have us to compute the velocity at time T_"
  },
  {
    "id": "lecture-cue-0111",
    "startSeconds": 2731.374,
    "timestamp": "45:31",
    "speaker": "Lecturer and students",
    "text": "Based on the diesel velocity acceleration and displacement. Yes sir. Now I would like to ask you how could we prove this one, the last equation. We start with Student: Def displacement. the first first equation. Lecturer: Which el equation. Student: The first equation."
  },
  {
    "id": "lecture-cue-0112",
    "startSeconds": 2751.824,
    "timestamp": "45:51",
    "speaker": "Lecturer and students",
    "text": "Oh no, you saw, the first equation we subject to being. Student: Oh Lecturer: we don't have X_ because we already have T squared. We we already have what? Student: Oh. Lecturer: because V equal V_ zero plus A_ T_ and on the left side we have V squared and on the right side we can look that we have the X_ and he's already T_ squared. So we start with this equation right?"
  },
  {
    "id": "lecture-cue-0113",
    "startSeconds": 2778.688,
    "timestamp": "46:18",
    "speaker": "Lecturer and students",
    "text": "Student: Yes. Lecturer: And then we The Student: Okay, same. Lecturer: yeah, so it's different from the first questions right? Student: Yes. Lecturer: And then we receive the T_ from also the first equations right? Okay, very good. So from equations here you have"
  },
  {
    "id": "lecture-cue-0114",
    "startSeconds": 2798.794,
    "timestamp": "46:38",
    "speaker": "Lecturer",
    "text": "Okay, we have to ask equals one. I'm going to prove the last one. we have to ask equal Let's say that is I would like to eliminate what I would like to eliminate T_ right? So then I have v₀ T_ plus one. V_ minus v₀ divided by A_"
  },
  {
    "id": "lecture-cue-0115",
    "startSeconds": 2824.96,
    "timestamp": "47:04",
    "speaker": "Lecturer",
    "text": "right? Plus one over two A_ I would like to eliminate two also, right? That is V_ minus v₀ divided by A_ square. The purpose to obtain the last equation is we would like to eliminate we would like to eliminate T_ right? Great because in the last equation we don't have time T_ right? And then from this equations we are able to do that V_ square equals v₀ square plus two A_ times delta X_"
  },
  {
    "id": "lecture-cue-0116",
    "startSeconds": 2862.964,
    "timestamp": "47:42",
    "speaker": "Lecturer",
    "text": "Ready? Alright. Now, going back to the geometric interpretation. When you have a constant acceleration, can you put that one? I wanna move it right. We just move A_ to the left hand hand side, right?"
  },
  {
    "id": "lecture-cue-0117",
    "startSeconds": 2884.764,
    "timestamp": "48:04",
    "speaker": "Lecturer and students",
    "text": "Student: Yeah. Lecturer: Okay, I believe that it's very straightforward to move that that one. You you can you can do it as a a half of it. Alright. Okay, come back to the geometry interpretation where the velocity is increasing linearly. What happen with the displacement?"
  },
  {
    "id": "lecture-cue-0118",
    "startSeconds": 2905.432,
    "timestamp": "48:25",
    "speaker": "Lecturer and students",
    "text": "Now in this case you can see that is linear, right? Student: Yes. Student: So we can say Lecturer: What about with X_ You have the relation between the velocity and the displacement is The relative displacement give you velocity. Which function give you the relative A_s eigenvalue function?"
  },
  {
    "id": "lecture-cue-0119",
    "startSeconds": 2930.532,
    "timestamp": "48:50",
    "speaker": "Lecturer and students",
    "text": "Student: Mm. Eigenvalue? Lecturer: One kind of order, right? the displacement will be I_second order, second order, right? Or quadratic function, that's Student: Right. Lecturer: it. Okay? That's is quadratic. Student: Quadratic. Lecturer: I remind you about our linear function and our quadratic function here. Look at the slide. Here."
  },
  {
    "id": "lecture-cue-0120",
    "startSeconds": 2958.968,
    "timestamp": "49:18",
    "speaker": "Lecturer and students",
    "text": "Okay. Oh, okay, let let's ask you this thing. How many of you here have not tak technically the course and tutoring mathematics? Okay, you raised your hand. So the first mathematics? Yes, the like math mat mathematics one, Student: Oh. Lecturer: or actually this is also called engineering mathematics. Student: This is no engineering math this semester so I can't take it back."
  },
  {
    "id": "lecture-cue-0121",
    "startSeconds": 2983.022,
    "timestamp": "49:43",
    "speaker": "Lecturer and students",
    "text": "you guys in the first Student: Hmm. Lecturer: matter of? Student: Yes. Lecturer: Yeah, okay. Okay, no no okay, no no problem. Oh it's okay. So the sign of here is okay, for linear function mathematically speaking, this is can be expressed"
  },
  {
    "id": "lecture-cue-0122",
    "startSeconds": 3000,
    "timestamp": "50:00",
    "speaker": "Lecturer and students",
    "text": "y equals a_x plus b, Student: right? Student: Yeah. Student: Mm-hmm. Lecturer: H is a variable y sub-function, right? Student: Yeah. Lecturer: And for product function, why equals why equals a_x square plus b_x plus c, right?"
  },
  {
    "id": "lecture-cue-0123",
    "startSeconds": 3022.094,
    "timestamp": "50:22",
    "speaker": "Lecturer and students",
    "text": "And graphically speaking, for linear function we have a straight line. For quadratic function we have a curve, Student: you curve, right. Lecturer: right, a curve, right? Great? Student: Mm-hmm. Lecturer: And you can see that the slope at every point"
  },
  {
    "id": "lecture-cue-0124",
    "startSeconds": 3043.018,
    "timestamp": "50:43",
    "speaker": "Lecturer and students",
    "text": "of the displacement will give you the velocity, for example, there's a lot of potential line here. Actually the issue of velocity. There's a lot of potential line here give you the velocity at that time. Let's say Student: Yes. Lecturer: Okay, in order to reveal the gas equations and other the derivative and the integration, I would suggest you to want to redo on canvas."
  },
  {
    "id": "lecture-cue-0125",
    "startSeconds": 3083.604,
    "timestamp": "51:23",
    "speaker": "Lecturer and students",
    "text": "Okay, let let's let's do one simple example. Okay. So now we have a race car starting from rest accelerates and a constant rate of five metre per second square. This means that acceleration is constant, right? Student: Mm-hmm. Lecturer: Okay, so is constant."
  },
  {
    "id": "lecture-cue-0126",
    "startSeconds": 3105.804,
    "timestamp": "51:45",
    "speaker": "Lecturer",
    "text": "Is constant. Right, and equals five. metre per second square. Right? Now we we know that the the car has travel for that distance, actually when you convert it too, metre, we we have Δx equals thirty point five metres. And now you need to compute what? You need to compute the velocity"
  },
  {
    "id": "lecture-cue-0127",
    "startSeconds": 3134.386,
    "timestamp": "52:14",
    "speaker": "Lecturer",
    "text": "at the second at the final position. Right? Whether car travel about 30.5 metres. What is the velocity here? It's the velocity. Which equation should we use? Which one is the easiest one, the fastest one. We know what information we have. Basically we have a three kinematic equations, right? For motion with constant accelerations. Now we know acceleration, right?"
  },
  {
    "id": "lecture-cue-0128",
    "startSeconds": 3163.436,
    "timestamp": "52:43",
    "speaker": "Lecturer and students",
    "text": "Student: Yeah. Lecturer: You know what? You know we have the X_ And you know the initial velocity, right? Initial Student: Yeah. Lecturer: velocity is zero, right? Student: The third Lecturer: Which means Student: one, Lecturer: the person should Student: the Lecturer: be initial Student: third one. Lecturer: is emitted velocity Student: The third one, Lecturer: should be Student: the third Lecturer: equal Student: one. Lecturer: to zero. The third one. Student: Third one. Lecturer: The last one, right? The third one, right? So I A_ We use V_ square equals V_ naught square plus two"
  },
  {
    "id": "lecture-cue-0129",
    "startSeconds": 3189.876,
    "timestamp": "53:09",
    "speaker": "Lecturer and students",
    "text": "A times You have to expand. Yep. Okay, this one is zero, right? Student: Mm-hmm. Lecturer: And A is you have I arriving, you have get this arriving and Student: Five. Lecturer: then you are able to compute V equals yes, I I I need you the V the final solution. Is"
  },
  {
    "id": "lecture-cue-0130",
    "startSeconds": 3220.328,
    "timestamp": "53:40",
    "speaker": "Lecturer",
    "text": "The final speed is 17.5 m/s. Now, how much time has elapsed from the initial position to the final position? Which equation should we use?",
    "note": "The value 17.5 m/s follows the supplied worked example; the automatic transcript heard 7.5 m/s."
  },
  {
    "id": "lecture-cue-0131",
    "startSeconds": 3240.528,
    "timestamp": "54:00",
    "speaker": "Lecturer and students",
    "text": "Student: The first equation. Lecturer: Right. From v = v₀ + at, t = (v − v₀) / a. The result is 3.5 seconds."
  },
  {
    "id": "lecture-cue-0132",
    "startSeconds": 3268.34,
    "timestamp": "54:28",
    "speaker": "Lecturer and students",
    "text": "Okay, now we need to compute the the average velocity in two different ways. Okay, the first way is a stressful way, so that we use what is the average velocity. The velo velocity is increasing linearly, right? Student: Mm-hmm. Lecturer: The average velocity will be the initial velocity plus the final velocity"
  },
  {
    "id": "lecture-cue-0133",
    "startSeconds": 3288.99,
    "timestamp": "54:48",
    "speaker": "Lecturer and students",
    "text": "Student: Divide by two. Lecturer: Right: (v₀ + v) / 2. With v₀ = 0 and v = 17.5 m/s, the average velocity is 8.75 m/s."
  },
  {
    "id": "lecture-cue-0134",
    "startSeconds": 3308.992,
    "timestamp": "55:08",
    "speaker": "Lecturer and students",
    "text": "Okay. Student: Okay. Lecturer: I keep my last initial velocity zero. Right? another way is you can compute the velocity as the velocity Student: Okay. Lecturer: The Average Velocity as as well. Student: Does the lower time Lecturer: Oh, Student: make Lecturer: very Student: sense? Lecturer: good. The other acts over Student: Time."
  },
  {
    "id": "lecture-cue-0135",
    "startSeconds": 3329.286,
    "timestamp": "55:29",
    "speaker": "Lecturer and students",
    "text": "Use displacement divided by time: 30.5 m / 3.5 s ≈ 8.71 m/s. The two average-velocity results differ slightly. What causes the difference?"
  },
  {
    "id": "lecture-cue-0136",
    "startSeconds": 3349.294,
    "timestamp": "55:49",
    "speaker": "Lecturer and students",
    "text": "Student: Rounding. Lecturer: Right—the difference comes from rounding during the calculation."
  },
  {
    "id": "lecture-cue-0137",
    "startSeconds": 3393.844,
    "timestamp": "56:33",
    "speaker": "Lecturer",
    "text": "Okay, that is a generalisation of the velocity and displacement based on using kinematic equations, right? You start with the definition of the average velocity, then you hit the velocity. Okay, a more general way is we use integration based based."
  },
  {
    "id": "lecture-cue-0138",
    "startSeconds": 3415.06,
    "timestamp": "56:55",
    "speaker": "Lecturer",
    "text": "and this way can be applied to other cases when you have the variations of accelerator accelerator be small complicated. Okay? So specifically so from the relation between acceleration and velocity you have a equals d_V_ over d_t_ right? Now d_V_ minus is constant."
  },
  {
    "id": "lecture-cue-0139",
    "startSeconds": 3438.71,
    "timestamp": "57:18",
    "speaker": "Lecturer and students",
    "text": "So then you have d_V_ equals a times d_t_ right? And now I'm going to set the integral of a sign. Okay? Student: Okay. Lecturer: From zero to T_ from zero to T_ It's alright."
  },
  {
    "id": "lecture-cue-0140",
    "startSeconds": 3461.172,
    "timestamp": "57:41",
    "speaker": "Lecturer and students",
    "text": "On the left-hand side, you may have what is the a integral of the derivative? Please speaking, okay, can you tell me what is the integral of f? So, Student: Ax. Lecturer: I mean x. Student: X. Student: X."
  },
  {
    "id": "lecture-cue-0141",
    "startSeconds": 3482.268,
    "timestamp": "58:02",
    "speaker": "Lecturer and students",
    "text": "So what is the integral of d_v_ Student: D_V_ Lecturer: V_V_ it's simple, right? From zero to T_ Student: Yeah. Student: Mm. Lecturer: The right-hand side is, okay, if I is constant, what can I do? I is constant, right? I can put it in front, right? Base constant so that I have a a integral zero T_ d_T_ right?"
  },
  {
    "id": "lecture-cue-0142",
    "startSeconds": 3509.1,
    "timestamp": "58:29",
    "speaker": "Lecturer",
    "text": "So again, integral of d_T_s, T_ from zero to T_ right? That is simply T_ right? The T_ subtracted by zero is T_ right? And the left hand side is When you is use the two bounds, the upper bound and the lower bound, right, you have a V_ at T_ right,"
  },
  {
    "id": "lecture-cue-0143",
    "startSeconds": 3532.586,
    "timestamp": "58:52",
    "speaker": "Lecturer",
    "text": "subtract by V_ at T_ equals zero, right. Equals 80. Quick. What is equal to V_ the velocity of T_ and the velocity of T_ equals zero, right. And the value here is v₀. v₀. v₀. And then you have"
  },
  {
    "id": "lecture-cue-0144",
    "startSeconds": 3553.036,
    "timestamp": "59:13",
    "speaker": "Lecturer",
    "text": "V_ V_ equals v₀ plus A_ T_ This variation is more general than the previous one, because you can use this one for any variations on acceleration. So for example acceleration is linear or even quadratic function, right, not constant. Make sense?"
  },
  {
    "id": "lecture-cue-0145",
    "startSeconds": 3591.444,
    "timestamp": "59:51",
    "speaker": "Lecturer",
    "text": "We go back to our problem here, our experiment as before, right? We can see that"
  },
  {
    "id": "lecture-cue-0146",
    "startSeconds": 3600,
    "timestamp": "1:00:00",
    "speaker": "Lecturer and students",
    "text": "So the heavy objects like the bowling ball and the light object like the feather, right, they will falling down at the same speed, right? Student: Yeah. Lecturer: Touch the ground simultaneously. So now we are going to quantify the phenomenon. Okay, so if you have a free falling motions, what is the acceleration?"
  },
  {
    "id": "lecture-cue-0147",
    "startSeconds": 3628.692,
    "timestamp": "1:00:28",
    "speaker": "Lecturer",
    "text": "Austin, right? Okay, I'm going to throw down from a a high edge, right? And I'm choosing sponges as the upward. The acceleration really"
  },
  {
    "id": "lecture-cue-0148",
    "startSeconds": 3649.892,
    "timestamp": "1:00:49",
    "speaker": "Lecturer and students",
    "text": "It is a gravity Student: Okay. Lecturer: acceleration, right? right, straight. Close one. So, the race on. Why don't I choose this y positive? So is minus three, right?"
  },
  {
    "id": "lecture-cue-0149",
    "startSeconds": 3674.898,
    "timestamp": "1:01:14",
    "speaker": "Lecturer and students",
    "text": "Student: Mm. Yeah. Lecturer: And then I simply replace A_ by minus Student: Yes. Lecturer: three, so then I have the velocity movie. three kinematic equations now it becomes okay, so I have V_ equals V_ Student: not"
  },
  {
    "id": "lecture-cue-0150",
    "startSeconds": 3695.108,
    "timestamp": "1:01:35",
    "speaker": "Lecturer",
    "text": "minus, cheated right? I simply relate replace rate acceleration by minus g, you understand? And Δx actually in this case I just use Y_ because it's in vertical direction, right? I just change the notation X_ by Y_ and then I have delta Y equals v₀ T_ minus a half G_ T_ squared, right?"
  },
  {
    "id": "lecture-cue-0151",
    "startSeconds": 3722.19,
    "timestamp": "1:02:02",
    "speaker": "Lecturer",
    "text": "And then I have a V_ squared equals v₀ squared minus two G delta one. Great. That is three kinematic equation in this case. Now I would like to measure the time for the ball B_"
  },
  {
    "id": "lecture-cue-0152",
    "startSeconds": 3742.908,
    "timestamp": "1:02:22",
    "speaker": "Lecturer",
    "text": "Don't you look round. How do I compute that one? If I neglect the the air resistance, right? How do I compute the time t here? And I assume that the initial let's say to make it simple this is zero. How do I compute t? For the body touch the ground?"
  },
  {
    "id": "lecture-cue-0153",
    "startSeconds": 3769.652,
    "timestamp": "1:02:49",
    "speaker": "Lecturer and students",
    "text": "User, second equation is very good, right? From the second equation what do I have? Student: B Lecturer: Okay, Student: equal Lecturer: gamma. gamma, get a Y_ get a Y_ is the final position subtracted by the initial position, right? Student: Yes. Lecturer: The final position is what? Student: Zero. Lecturer: Zero. Student: X_ Lecturer: Zero."
  },
  {
    "id": "lecture-cue-0154",
    "startSeconds": 3791.052,
    "timestamp": "1:03:11",
    "speaker": "Lecturer",
    "text": "Subtracted by the initial position is H_ equals like v₀ is zero. v₀ is zero, right? So I just write that write this one again as minus this one c T squared. v₀ is zero, right? And then from here I have T_ equals one root of"
  },
  {
    "id": "lecture-cue-0155",
    "startSeconds": 3816.23,
    "timestamp": "1:03:36",
    "speaker": "Lecturer",
    "text": "two h divided by g_ only, right? Great. So you can see that the time for the body to touch the ground depends on what? Depends on the height. Obvious, right? If you consider two bodies the mass and the shape doesn't matter,"
  },
  {
    "id": "lecture-cue-0156",
    "startSeconds": 3842.596,
    "timestamp": "1:04:02",
    "speaker": "Lecturer and students",
    "text": "Student: Yeah. Lecturer: like in the experiment you watched before, right? If you throw these body from the same height, right? For smooth and practised hand accelerations, it's the same, the high the same. The time delay is Student: The same. Lecturer: the same, right? And then you can see that the velocity is the same, right? So that's the reasons displayed for the results of this experiment you watched before, I say?"
  },
  {
    "id": "lecture-cue-0157",
    "startSeconds": 3870.206,
    "timestamp": "1:04:30",
    "speaker": "Lecturer and students",
    "text": "Student: Yes. Lecturer: Okay, this one confirm Zippy-zow."
  },
  {
    "id": "lecture-cue-0158",
    "startSeconds": 3904.98,
    "timestamp": "1:05:04",
    "speaker": "Lecturer",
    "text": "Another is the motion in one-dimensional scenario in which you have a motion in a straight line, right? Now we consider a more complicated dis situations when you for example when you throw a ball like this, right? And then you will have a motion the path of motion of the ball we be in"
  },
  {
    "id": "lecture-cue-0159",
    "startSeconds": 3928.34,
    "timestamp": "1:05:28",
    "speaker": "Lecturer",
    "text": "two dimensional space, right? Is the two can be specified by two components, x component and y component, right? Actually actually the extension is very straightforward, right? You simply consider is as a combination of two motion in one dimensional space."
  },
  {
    "id": "lecture-cue-0160",
    "startSeconds": 3949.94,
    "timestamp": "1:05:49",
    "speaker": "Lecturer",
    "text": "One motion in x direction and another motion in y direction, right? I said?"
  },
  {
    "id": "lecture-cue-0161",
    "startSeconds": 3955.22,
    "timestamp": "1:05:55",
    "speaker": "Lecturer",
    "text": "Okay and we also use the same kinematic equations as before for this case because in this case we have okay let me describe this problem setting here. You are are going to throw a bas basketball right with a certain initial velocity"
  },
  {
    "id": "lecture-cue-0162",
    "startSeconds": 3976.02,
    "timestamp": "1:06:16",
    "speaker": "Lecturer",
    "text": "that is V_ naught. The velocity is a vector quantity, right? and with a certain large angle, that is the initial angle, theta. And during the motion here, what is the acceleration acting on the ball? We only have one acceleration, right, in which direction?"
  },
  {
    "id": "lecture-cue-0163",
    "startSeconds": 3999.39,
    "timestamp": "1:06:39",
    "speaker": "Lecturer and students",
    "text": "Student: Damn. Lecturer: Why direction, right? So you have only this one, that is Student: Oh. Lecturer: straight. Student: Oh, Lecturer: I eat one, right? And it's because it's in front and down, so this is minor g, right? Student: Yes. Lecturer: S_ for free falling motion. And acceleration in that acceleration is?"
  },
  {
    "id": "lecture-cue-0164",
    "startSeconds": 4022.958,
    "timestamp": "1:07:02",
    "speaker": "Lecturer and students",
    "text": "Student: A_X_ Lecturer: Is zero, right? Because we neglect the air resistance. So, A_X_ is zero. Great. Okay, so now we are able to apply this one into direction X and Y. First we project the initial velocity at direction, so we have the component here is vehicle sine. We know cosine, this one is V_ sine,"
  },
  {
    "id": "lecture-cue-0165",
    "startSeconds": 4050.846,
    "timestamp": "1:07:30",
    "speaker": "Lecturer",
    "text": "right? And then you have okay. So in Okay, so you have And the reaction, simple, right?"
  },
  {
    "id": "lecture-cue-0166",
    "startSeconds": 4099.572,
    "timestamp": "1:08:19",
    "speaker": "Lecturer and students",
    "text": "The H_ direction you have r m V_x equals what? Reynolds arts plus the acceleration in H_ direction, right? We l gravity. This one is zero, right? Student: Yeah. Lecturer: So this one is and totally this one is V_ nos V_ is V_ nos cosine theta, right?"
  },
  {
    "id": "lecture-cue-0167",
    "startSeconds": 4126.652,
    "timestamp": "1:08:46",
    "speaker": "Lecturer and students",
    "text": "And the other has equal squat. Go back to this equation, you have V_ non T_ plus one over right. So again, A_ equal zero, right? So you have Student: No, T_ not. Lecturer: V_ non goes side two the time T_ only. Right? In that direction. I sack. What about one direction?"
  },
  {
    "id": "lecture-cue-0168",
    "startSeconds": 4152.308,
    "timestamp": "1:09:12",
    "speaker": "Lecturer and students",
    "text": "Why are there any small interesting things? Because we have a non-zero acceleration in one direction, right? So you have why v_y equals what? v_0y plus a_y_t_ right? Student: Yeah. Lecturer: So it is v_0 sine theta. Acceleration in y direction is direct as an acceleration right? Minus g."
  },
  {
    "id": "lecture-cue-0169",
    "startSeconds": 4177.972,
    "timestamp": "1:09:37",
    "speaker": "Lecturer and students",
    "text": "I'm still right? Where is the capital Y_ Okay, as you have v₀ Y_ T_ right? plus one over two Student: G_ T_ Lecturer: A_ Y_ T_ square right? And then this is what? v₀ psi theta plus T_"
  },
  {
    "id": "lecture-cue-0170",
    "startSeconds": 4200.052,
    "timestamp": "1:10:00",
    "speaker": "Lecturer",
    "text": "minus R half g T_ squared. Great. Actually, the two dimensional motion here can be considered as a combination of two one dimensional motion, right? One in X direction and one in Y direction. Great. And we need to know the acceleration in each direction, right? And we apply the kinematic equations for our for one dimensional motion. You may say?"
  },
  {
    "id": "lecture-cue-0171",
    "startSeconds": 4227.028,
    "timestamp": "1:10:27",
    "speaker": "Lecturer",
    "text": "If I use a tractor. Okay and then here's the results, right? The the one we've just comp derived here. So that you can see that the velocity and acceleration is constant. the velocity in one direction changes, right? So and then we plot the velocity vector. You can see that."
  },
  {
    "id": "lecture-cue-0172",
    "startSeconds": 4249.578,
    "timestamp": "1:10:49",
    "speaker": "Lecturer",
    "text": "Okay. So here's two components of the velocity. And the top of the part, so the part here, the y y one positive is zero. I I I we put that one in in in the tutorial sessions. Okay."
  },
  {
    "id": "lecture-cue-0173",
    "startSeconds": 4269.68,
    "timestamp": "1:11:09",
    "speaker": "Lecturer and students",
    "text": "Student: Okay. Lecturer: Alright that is for projectile motion in which we have a motion in two dimensional space. Okay. Okay. Now, we apply the equations we have and we arrive to a simple example. So in which you have a car, right, from the height of ten meters, right, the height is ten meters."
  },
  {
    "id": "lecture-cue-0174",
    "startSeconds": 4304.408,
    "timestamp": "1:11:44",
    "speaker": "Lecturer",
    "text": "Great. And now the velocity at the top of the the cliff here is twenty meters per second in the horizontal direction. v₀ X_ equals twenty meter per second."
  },
  {
    "id": "lecture-cue-0175",
    "startSeconds": 4326.222,
    "timestamp": "1:12:06",
    "speaker": "Lecturer and students",
    "text": "Right? You know three information. The initial hot, initial position is 10 metre from the ground, right? Student: Mm-hmm. Lecturer: And initial velocity in x direction is twenty metre per second. No vertical initial se velocity. And initial angle is titter in this case zero,"
  },
  {
    "id": "lecture-cue-0176",
    "startSeconds": 4348.218,
    "timestamp": "1:12:28",
    "speaker": "Lecturer and students",
    "text": "Student: You should be. Student: Yeah. Lecturer: right? Student: Yeah. Student: Shit. Lecturer: Great. Student: Yeah. Student: You too. We don't think so. Lecturer: Okay, going back to this one, you have a T_ T_ thirty-six five initial angle. That is the angle Student: Launch. Lecturer: form by the missile's velocity and x direction, you understand? Student: Yes. Student: Mm-hmm. Lecturer: And in this case, because the velocity's in the horizontal direction, so theta is zero. Okay? So we have"
  },
  {
    "id": "lecture-cue-0177",
    "startSeconds": 4374.606,
    "timestamp": "1:12:54",
    "speaker": "Lecturer",
    "text": "Here's the initial velocity, right? Case, think of X_ is v₀ one. Okay? And then you apply kinematic equations, U_ I_ go to computer Okay, but first we need to compute what. The purpose here is we would like to do this one."
  },
  {
    "id": "lecture-cue-0178",
    "startSeconds": 4396.264,
    "timestamp": "1:13:16",
    "speaker": "Lecturer and students",
    "text": "How far. That is in in in which direction? Student: Lecturer: X_ direction, right? Student: yes. Lecturer: Agree? You would have to compute the X_ components of the final position, right? Student: Yeah. Lecturer: So then you apply the kinematic equations, we have okay, so X_ for this one and this one is zero, right?"
  },
  {
    "id": "lecture-cue-0179",
    "startSeconds": 4423.836,
    "timestamp": "1:13:43",
    "speaker": "Lecturer and students",
    "text": "Student: Yes. Lecturer: Because in this proposition x₀ a zero. Agree? Student: Yes. Student: Yeah. Lecturer: And Y_ Why position you have, okay, initial position, this one, initial velocity is v₀ y, acceleration in y direction is minus two, right? Student: Yes. Lecturer: Then you have this expression because v_ zero y is"
  },
  {
    "id": "lecture-cue-0180",
    "startSeconds": 4445.97,
    "timestamp": "1:14:05",
    "speaker": "Lecturer and students",
    "text": "Student: Zero. Lecturer: zero, right good. v_ zero y is zero. This one is zero, right? And because you have 20s v not x zero is v not y. Great? Student: Yes."
  },
  {
    "id": "lecture-cue-0181",
    "startSeconds": 4466.49,
    "timestamp": "1:14:26",
    "speaker": "Lecturer and students",
    "text": "Now, we will have to confuse what how how many unknowns. So now we have a two equations, right? Student: Yes. Lecturer: And how many unknowns? Student: Delta T is unknown. Lecturer: Look look look at these two equations, how many unknowns? You'll hear my voice, okay. La let me know. This one we know, what? We lost the"
  },
  {
    "id": "lecture-cue-0182",
    "startSeconds": 4487.996,
    "timestamp": "1:14:47",
    "speaker": "Lecturer and students",
    "text": "X_ direction, right? Student: Delta T_ Lecturer: we know Student: It's unknown. Lecturer: we know this one. g. Student: Yeah. Student: Mm-hmm. Lecturer: We know why not, right? Student: Yes. Student: It's Lecturer: And we also know Student: x₀. Lecturer: why T_ right? Student: Yes. Student: Yeah. Student: Yeah. Lecturer: So agree? Student: Yes. T_ s. Lecturer: T_ w what is why not?"
  },
  {
    "id": "lecture-cue-0183",
    "startSeconds": 4510.932,
    "timestamp": "1:15:10",
    "speaker": "Lecturer and students",
    "text": "Why don't we increase your resistance Student: It's Lecturer: like Student: not sure. Ten meter. Ten Lecturer: a wide Student: meters. Lecturer: direction. Then it's ten, right? This one is ten metre. Student: Yep. Lecturer: and this will sing this is fine arts, right? Student: Mm-hmm. Student: Yes. Lecturer: And one is one. Student: Zero. Lecturer: And Student: Zero. Lecturer: zero, okay. And finally, and T_ here, T_ here, right, T_ here. Oh, this one is zero."
  },
  {
    "id": "lecture-cue-0184",
    "startSeconds": 4532.494,
    "timestamp": "1:15:32",
    "speaker": "Lecturer and students",
    "text": "Student: One T_ and one T_ and. Lecturer: And no, half now how many equations? Two equations, how many unknowns? Student: One. Student: One. Student: One Student: and belt and a T_ Lecturer: Really? Student: and Lecturer: You need one unknown? Student: T_ two two Lecturer: Two unknowns? Student: time and Lecturer: Time and? Student: then there to T_ Lecturer: Yes, right? Student: Yes. Student: Yeah. Lecturer: Okay, we have a two unknowns."
  },
  {
    "id": "lecture-cue-0185",
    "startSeconds": 4558.85,
    "timestamp": "1:15:58",
    "speaker": "Lecturer and students",
    "text": "T_ and X_ Right? Student: Yes. Lecturer: So now how how do we compute. Every alpha process we would like to compute X_ right? Student: Yes. Student: Yeah. Lecturer: Can you tell me the game plan here, We we Student: can can Lecturer: can we start Student: bring the Lecturer: problem? Student: challenge and Lecturer: The the Student: then we Lecturer: second Student: use the or challenge Lecturer: the question to way. Student: calculate Student: Use Lecturer: Can you find Student: the Student: the second Student: T_s. Lecturer: it? Student: equation. Lecturer: Can you use"
  },
  {
    "id": "lecture-cue-0186",
    "startSeconds": 4579.054,
    "timestamp": "1:16:19",
    "speaker": "Lecturer and students",
    "text": "Student: Shake. Lecturer: it, the second equation to find out T_ Student: The T_ Lecturer: T_ and then is it T_ too? Student: Yeah, Lecturer: The Student: To X_ Student: I think Lecturer: the second Student: or the question second way. Lecturer: too, Student: yeah. Lecturer: it's a different way, but this again plan, but on the second equation, Student: Alright. Lecturer: we write the old of ten T_ then we subtract to the first equation, right? Student: Yes. Lecturer: And then we have a able to compute how far all the this motion. Is that? Student: Yes. Student: Mm-hmm."
  },
  {
    "id": "lecture-cue-0187",
    "startSeconds": 4599.104,
    "timestamp": "1:16:39",
    "speaker": "Lecturer and students",
    "text": "Okay. Okay, it's okay, we still have a time, right? Okay. Student: Mm-hmm."
  },
  {
    "id": "lecture-cue-0188",
    "startSeconds": 4606.006,
    "timestamp": "1:16:46",
    "speaker": "Lecturer and students",
    "text": "The last topic for today is a relative motion. Okay? So far when we talk about the velocity, actually we are talking about the absolute velocity, right? Student: Yeah. Lecturer: You find the velocity according to a fixed reference. Student: Mm-hmm. Student: Mm-hmm. Lecturer: The reference doesn't move, right? Now let's consider the following simple examples."
  },
  {
    "id": "lecture-cue-0189",
    "startSeconds": 4629.506,
    "timestamp": "1:17:09",
    "speaker": "Lecturer and students",
    "text": "Okay, let's consider the following simple examples. we have a three, actually on the two motions here. and one person here, our maze, is at a fixed location, right? Student: Yes. Lecturer: And our velocity is where on a bicycle absolute velocity is five metre per second. Student: Yes. Lecturer: he is riding on a carriage of fifteen metre per second, right?"
  },
  {
    "id": "lecture-cue-0190",
    "startSeconds": 4655.112,
    "timestamp": "1:17:35",
    "speaker": "Lecturer and students",
    "text": "Student: Yes. Lecturer: And now Yeah, yeah, as relates velocity smeans that here is a velocity with respect to army, right? Student: Mm-hmm. Lecturer: Here the velocity of me with respect to army, right? Student: Yes. Lecturer: Now army and view say that, okay according to army, tell us we're going at about five metre per second."
  },
  {
    "id": "lecture-cue-0191",
    "startSeconds": 4680.788,
    "timestamp": "1:18:00",
    "speaker": "Lecturer",
    "text": "According to Amy, he said that he's driving with the velocity's five to a second, according to Amy. Okay, according to you, you said that okay, can us was moving backward at a velocity minus ten metre per second. Who is who is right?"
  },
  {
    "id": "lecture-cue-0192",
    "startSeconds": 4702.288,
    "timestamp": "1:18:22",
    "speaker": "Lecturer and students",
    "text": "Student: It neither. Lecturer: Student: Well, it depends on the perspective. Lecturer: Oh my. Student: But all of them are right. Lecturer: But the answer is both done bright. Both Student: Yeah. Lecturer: of done are bright, because they are saying about it's the relative velocity not the absolute velocity, right?"
  },
  {
    "id": "lecture-cue-0193",
    "startSeconds": 4723.282,
    "timestamp": "1:18:43",
    "speaker": "Lecturer and students",
    "text": "Student: Granted, Lecturer: So you you have a fine metres per metre per second of hallos, it is a velocity, right? the absolute velocity is absolute velocity. That is V_C_ right? This one is absolute velocity of wheel, right? But it's a V_B_"
  },
  {
    "id": "lecture-cue-0194",
    "startSeconds": 4743.596,
    "timestamp": "1:19:03",
    "speaker": "Lecturer and students",
    "text": "Okay. And actually, R_B_ is Student: V_ Student: mm. Lecturer: standing at Student: Zero. Lecturer: s at one location. So, the V_A_ is Student: Zero. Lecturer: equal to zero, right? According to R_B_ Carlos was going about five metre per second at me. She's referring to"
  },
  {
    "id": "lecture-cue-0195",
    "startSeconds": 4764.664,
    "timestamp": "1:19:24",
    "speaker": "Lecturer and students",
    "text": "the relative velocity of the channels with respect to Pa, right? V_c_a_s is, and is V_C minus V_A_ right. Student: Five minutes. Lecturer: Right? Student: Yeah. Lecturer: Or actually I should denote it by this is better to"
  },
  {
    "id": "lecture-cue-0196",
    "startSeconds": 4787.014,
    "timestamp": "1:19:47",
    "speaker": "Lecturer",
    "text": "okay. To make the cons the notation consistent, I should use a V_ who is that is is this five subtract by zero is"
  },
  {
    "id": "lecture-cue-0197",
    "startSeconds": 4800,
    "timestamp": "1:20:00",
    "speaker": "Lecturer and students",
    "text": "one, right? We took a second. Great. Student: Great. Student: Yes. Lecturer: And this one is what? V_ Student: Build. Lecturer: V_C_ right? Student: Yes. Lecturer: B_ times V_C_ minus V_B_ so that's why we have five minus fifteen. That is minus ten litre per second."
  },
  {
    "id": "lecture-cue-0198",
    "startSeconds": 4823.3,
    "timestamp": "1:20:23",
    "speaker": "Lecturer and students",
    "text": "Student: Yes. Lecturer: Great? That's a definition of rel Student: Right. Lecturer: relative velocity. Student: Yeah. Lecturer: a frame. Student: Mm-hmm. Lecturer: So in general in general, okay, this one is quite complicated, right? So, okay, in general in a two-dimensional space, if you consider the motion of an object C, we expect to two frames, A and B."
  },
  {
    "id": "lecture-cue-0199",
    "startSeconds": 4851.934,
    "timestamp": "1:20:51",
    "speaker": "Lecturer",
    "text": "Right? For example, a fr a reference reference frame here. And reference frame is over there. Then we talk about the precision of the the the the the an object at sea, you need to specify last you need to quantify the the the motion of sea with respect to which rel which frame?"
  },
  {
    "id": "lecture-cue-0200",
    "startSeconds": 4875.154,
    "timestamp": "1:21:15",
    "speaker": "Lecturer and students",
    "text": "Okay, give me two minutes. Which brand? Right? So some role here you are able to compute the position and twice serious back to me by using two vectors, right? Student: Yeah. Lecturer: Okay. So here Student: And one. Lecturer: you have a serious vector B will be serious vector A plus A serious vector B. Make sense?"
  },
  {
    "id": "lecture-cue-0201",
    "startSeconds": 4900.306,
    "timestamp": "1:21:40",
    "speaker": "Lecturer and students",
    "text": "Student: Yes. Lecturer: You agree? And then once you have the position, how do you obtain the velocity? You tell her the front position of from the displacement how do you obtain the velocity? You tell her the derivative, right? Student: Yes. Lecturer: The derivative of the displacement give you the velocity, Student: Velocity. Lecturer: right?"
  },
  {
    "id": "lecture-cue-0202",
    "startSeconds": 4921.338,
    "timestamp": "1:22:01",
    "speaker": "Lecturer",
    "text": "Then you take the derivative, most times that's a two, right? Then you have the rule of the transformations of velocity according to two reference frames. Basically, here's the bottom line. When you would like to compare the velocity of C_ with respect to B_ you compare the velocity of C_ with respect to A_ plus the velocity of A_ with respect with respect to B_ which is the same as which rule?"
  },
  {
    "id": "lecture-cue-0203",
    "startSeconds": 4953.056,
    "timestamp": "1:22:33",
    "speaker": "Lecturer and students",
    "text": "The addition rule for vector. Student: Okay, Lecturer: It's what? Student: yes. Lecturer: But the nature here that vector is is successfully Back velocity is essentially back Student: Vector. Lecturer: to quantities, right? Student: Yes. Lecturer: So it's followed the addition rule."
  },
  {
    "id": "lecture-cue-0204",
    "startSeconds": 4965.702,
    "timestamp": "1:22:45",
    "speaker": "Lecturer and students",
    "text": "Okay, thank you guys. Now is he? Student: Yes. Lecturer: Okay, he will ha introduce about student processing, it's right? Student: Yes. Student: this. Lecturer: Okay, so do you need the computer here? Student: Oh yeah. Lecturer: For I have a sliding record."
  },
  {
    "id": "lecture-cue-0205",
    "startSeconds": 4987.49,
    "timestamp": "1:23:07",
    "speaker": "Student",
    "text": "May I have a digital one? Huh? A magnetic jar? Student: Tween Tyler died. Student: Poor mammy. Student: Can I take just one Student: just a Student: f Student: just a photo? Student: Oh. Student: Oh, yeah. So now we've got about two Tyler. Student: That'll be okay. Student: Oh my God. Do I look alright? Student: Five minutes? Student: Oh my God. Student: Oh my God. Oh my God. Student: Oh, T-Tyler is not an actress, is Student: it? Student: T-Tyler? Student: I can't. I don't even get one. The actress is teaching her children, but the actress is teaching her children."
  },
  {
    "id": "lecture-cue-0206",
    "startSeconds": 5014.554,
    "timestamp": "1:23:34",
    "speaker": "Student",
    "text": "[Classroom conversation in Vietnamese is partly unclear.] Tôi không biết, nhưng tôi biết là người ta dạy mấy tí cho mình. Nhưng bây giờ, nếu mà…",
    "note": "Vietnamese classroom speech is only partly recoverable from the automatic transcript."
  },
  {
    "id": "lecture-cue-0207",
    "startSeconds": 5036.554,
    "timestamp": "1:23:56",
    "speaker": "Learning adviser and students",
    "text": "[Classroom conversation in Vietnamese is partly unclear.] Learning adviser: My name is Do. [Affiliation unclear.] Today I’ll introduce Student Academic Success.",
    "note": "The speaker’s affiliation is unclear in the recording transcript."
  },
  {
    "id": "lecture-cue-0208",
    "startSeconds": 5062.046,
    "timestamp": "1:24:22",
    "speaker": "Learning adviser",
    "text": "we have a team of learning advisors. Yeah, so if you meet someone if you you can complete these guys for the library at any time during their working hours they can provide you some tips on how to adapt to university life. they can also help you"
  },
  {
    "id": "lecture-cue-0209",
    "startSeconds": 5086.35,
    "timestamp": "1:24:46",
    "speaker": "Learning adviser",
    "text": "create an effective study plan, so you could tackle your deadlines effectively. if you have any problem with your writing skills, you can come meet computer more in jocks street. these are the they've been teaching English for quite a while, so they're like our writing experts. We also have a math lady called or non. So if you have any problem with your math, maybe come and tailor a visit as well."
  },
  {
    "id": "lecture-cue-0210",
    "startSeconds": 5114.428,
    "timestamp": "1:25:14",
    "speaker": "Learning adviser and students",
    "text": "This is our website, sas.rmit.edu.vn. On the website you can find the learning advisers’ working hours and available services.",
    "note": "Website spelling follows the supplied annotated lecture page."
  },
  {
    "id": "lecture-cue-0211",
    "startSeconds": 5134.728,
    "timestamp": "1:25:34",
    "speaker": "Learning adviser and students",
    "text": "Student: Mm. Learning adviser: Yeah, so for example if you click on the task schedule you can see the working the working hours of or our staffs and"
  },
  {
    "id": "lecture-cue-0212",
    "startSeconds": 5156.21,
    "timestamp": "1:25:56",
    "speaker": "Learning adviser and students",
    "text": "Student: You can be really silent. Learning adviser: Oh, Student: And Learning adviser: and the next service Student: they're is nice. Learning adviser: then is peer assist learning or we know it as work for graduate. So we are also a student here and we are high by the SAS to help other students with their academic stuff. So if you need someone to discuss your homework with or"
  },
  {
    "id": "lecture-cue-0213",
    "startSeconds": 5179.924,
    "timestamp": "1:26:19",
    "speaker": "Learning adviser",
    "text": "Maybe just someone to share their experience with you compare the visit at two four forty and the building two, the fourth floor right next to the Mac lab. So for engineering we have three people. now this is student from electrical and electronics. The second guy is me. I'm from software engineering and we have a lot from robotics."
  },
  {
    "id": "lecture-cue-0214",
    "startSeconds": 5203.674,
    "timestamp": "1:26:43",
    "speaker": "Learning adviser",
    "text": "We also provide some online services for first year students. we have a website called Learning Lab. if you go to the website and click on the assessment task, we have some free courses for student with writing skills like essay writing, reports, presentations. I think these are fundamental skills for you when doing group projects. So"
  },
  {
    "id": "lecture-cue-0215",
    "startSeconds": 5233.524,
    "timestamp": "1:27:13",
    "speaker": "Learning adviser",
    "text": "Yeah. We also have a math section. there are some topics that I think will be taught in math one to like complex numbers, differentiation, matrix. yeah so I think it's worth taking a look at it."
  },
  {
    "id": "lecture-cue-0216",
    "startSeconds": 5253.684,
    "timestamp": "1:27:33",
    "speaker": "Learning adviser and students",
    "text": "To sum up, please remember our website: sas.rmit.edu.vn. The information is available there. Thank you. Any questions?",
    "note": "Website spelling follows the supplied annotated lecture page."
  },
  {
    "id": "lecture-cue-0217",
    "startSeconds": 5280.536,
    "timestamp": "1:28:00",
    "speaker": "Student",
    "text": "No, you got to just come in the working hours. So why how can we know that the writing teacher or the math teacher is there or not? So they are all there all the time, right? if if you come to the website, I think you can see the working hours for each individual and it's like yeah for our programmes, we work every weekday from one to four."
  },
  {
    "id": "lecture-cue-0218",
    "startSeconds": 5307.668,
    "timestamp": "1:28:27",
    "speaker": "Learning adviser and students",
    "text": "How do you create programmes here? I think the managers. Student: Yes. Learning adviser: I think the minimum requirement is three programmes a day. And sometimes when sometimes we use any you follow the S_M_S_ website on Facebook, we will have to produce Student: That's So how many programmes do you have in a day?"
  },
  {
    "id": "lecture-cue-0219",
    "startSeconds": 5329.918,
    "timestamp": "1:28:49",
    "speaker": "Learning adviser and students",
    "text": "I can't remember exactly. But I think probably seven two or something. Student: Seventy two. Learning adviser: Seven two. That's Student: Seventy Learning adviser: like Student: two. Learning adviser: that's like a But what major are you from? Student: So first you hear nine. Student: I think Student: Ah clock. Learning adviser: Would you believe it? I'm saving it for a while, but I think you may have to wait for me to like graduate."
  },
  {
    "id": "lecture-cue-0220",
    "startSeconds": 5359.382,
    "timestamp": "1:29:19",
    "speaker": "Learning adviser and students",
    "text": "So any other questions? Okay, so thank you very much for your time. And I hope to see you guys next week. Student: Ooh."
  }
] satisfies readonly TranscriptCue[];

function transcriptPoint(
  id: string,
  title: string,
  firstCueNumber: number,
  lastCueNumber: number,
) {
  const cues = kinematicsAudioCues.slice(firstCueNumber - 1, lastCueNumber);
  const nextCue = kinematicsAudioCues[lastCueNumber];
  return {
    id,
    title,
    startSeconds: cues[0].startSeconds,
    endSeconds: nextCue?.startSeconds ?? 5373.560091,
    cues,
  };
}

export const kinematicsTranscriptPoints = {
  lectureScope: transcriptPoint("lecture-scope", "the lecture scope", 1, 3),
  displacementAndAverageVelocity: transcriptPoint(
    "displacement-and-average-velocity",
    "displacement and average velocity",
    4,
    8,
  ),
  instantaneousVelocity: transcriptPoint(
    "instantaneous-velocity",
    "instantaneous velocity and tangent slope",
    9,
    21,
  ),
  accelerationDefinition: transcriptPoint(
    "acceleration-definition",
    "average and instantaneous acceleration",
    22,
    36,
  ),
  accelerationSigns: transcriptPoint(
    "acceleration-signs",
    "acceleration signs",
    37,
    46,
  ),
  freeFallDemonstration: transcriptPoint(
    "free-fall-demonstration",
    "the free-fall demonstration",
    47,
    68,
  ),
  constantVelocity: transcriptPoint(
    "constant-velocity",
    "velocity under constant acceleration",
    69,
    93,
  ),
  constantDisplacement: transcriptPoint(
    "constant-displacement",
    "constant-acceleration displacement equations",
    94,
    116,
  ),
  constantGraphs: transcriptPoint(
    "constant-graphs",
    "constant-acceleration graph shapes",
    117,
    124,
  ),
  raceCarExample: transcriptPoint(
    "race-car-example",
    "the accelerating race-car example",
    125,
    136,
  ),
  constantIntegration: transcriptPoint(
    "constant-integration",
    "the integration-based derivation",
    137,
    145,
  ),
  freeFallEquations: transcriptPoint(
    "free-fall-equations",
    "free-fall equations",
    146,
    157,
  ),
  projectileIntroduction: transcriptPoint(
    "projectile-introduction",
    "projectile motion in two dimensions",
    158,
    161,
  ),
  projectileComponents: transcriptPoint(
    "projectile-components",
    "horizontal and vertical projectile components",
    162,
    173,
  ),
  projectileExample: transcriptPoint(
    "projectile-example",
    "the horizontal-cliff example",
    174,
    187,
  ),
  relativeIntroduction: transcriptPoint(
    "relative-introduction",
    "relative velocity and reference frames",
    188,
    198,
  ),
  relativeTransformation: transcriptPoint(
    "relative-transformation",
    "the Galilean velocity transformation",
    199,
    203,
  ),
  learningSupportTransition: transcriptPoint(
    "learning-support-transition",
    "the transition to learning support",
    204,
    207,
  ),
  learningSupportServices: transcriptPoint(
    "learning-support-services",
    "Student Academic Success services",
    208,
    220,
  ),
} as const;

const assignedCueIds = Object.values(kinematicsTranscriptPoints).flatMap((point) =>
  point.cues.map((cue) => cue.id),
);
if (
  assignedCueIds.length !== kinematicsAudioCues.length ||
  new Set(assignedCueIds).size !== kinematicsAudioCues.length
) {
  throw new Error("Every lecture transcript cue must belong to exactly one lesson point.");
}
