"use client";

import { useState, type ReactNode } from "react";
import {
  AccessibleLessonShell,
  AccessibleMathRegion,
} from "./components/accessible-learning";
import {
  DataTableRegion,
  DescribedFigure,
  type LecturePoint,
  LecturePointHeading,
  RelationshipExplorer,
  VocabularyList,
} from "./components/accessible-interactions";
import { ConstantAccelerationExplorer } from "./constant-acceleration-explorer";
import { kinematicsTranscriptPoints } from "./kinematics-audio-transcript";
import {
  ProjectileCliffFigure,
  RelativeFrameFigure,
  SecantTangentFigure,
} from "./kinematics-visuals";
import { vietnameseKinematicsTranscriptPoints } from "./projectile-vietnamese";

function LectureHeading({
  level,
  headingId,
  points,
  language = "en-AU",
  children,
}: Readonly<{
  level: 2 | 3;
  headingId: string;
  points: readonly LecturePoint[];
  language?: "en-AU" | "vi";
  children: ReactNode;
}>) {
  return (
    <LecturePointHeading
      level={level}
      headingId={headingId}
      audioId="kinematics-lecture-audio"
      points={points}
      language={language}
    >
      {children}
    </LecturePointHeading>
  );
}

function CognitiveSupport({
  sectionId,
  keyPoints,
  heading = "Key points",
  summary = "Plain explanation",
  children,
}: Readonly<{
  sectionId: string;
  keyPoints: readonly string[];
  heading?: string;
  summary?: string;
  children: ReactNode;
}>) {
  const headingId = `${sectionId}-key-points`;

  return (
    <div className="lesson-cognitive-support">
      <aside className="lesson-key-points" aria-labelledby={headingId}>
        <h3 id={headingId}>{heading}</h3>
        <ul>
          {keyPoints.map((point) => <li key={point}>{point}</li>)}
        </ul>
      </aside>
      <details className="lesson-plain-explanation">
        <summary>{summary}</summary>
        <div>{children}</div>
      </details>
    </div>
  );
}

function OptionalContextIllustration({
  visual,
  caption,
  description,
}: Readonly<{
  visual: ReactNode;
  caption: string;
  description: string;
}>) {
  return (
    <div className="lesson-context-illustration" data-focus-optional="true">
      <DescribedFigure
        caption={caption}
        visual={visual}
        description={<p>{description}</p>}
      />
    </div>
  );
}

export default function Page() {
  const [language, setLanguage] = useState<"en-AU" | "vi">("en-AU");
  const vi = language === "vi";
  const t = (english: string, vietnamese: string) => vi ? vietnamese : english;

  return (
    <AccessibleLessonShell
      language={language}
      onLanguageChange={setLanguage}
      context={t("OENG1209 Engineering Science", "OENG1209 Khoa học Kỹ thuật")}
      title={t("Kinematics: describing motion", "Động học: mô tả chuyển động")}
      objective={t(
        "Apply kinematic equations to solve and explain constant-acceleration, free-fall, projectile, and relative-motion problems.",
        "Áp dụng các phương trình động học để giải và giải thích các bài toán về gia tốc không đổi, rơi tự do, chuyển động ném và chuyển động tương đối.",
      )}
      sections={[
        { id: "lesson-overview", label: t("Review the lecture topics", "Ôn tập các chủ đề của bài giảng") },
        { id: "displacement", label: t("Describe one-dimensional motion", "Mô tả chuyển động một chiều") },
        { id: "constant-acceleration", label: t("Use constant acceleration", "Sử dụng gia tốc không đổi") },
        { id: "free-fall", label: t("Model free fall", "Mô hình hóa rơi tự do") },
        { id: "projectile-motion", label: t("Resolve projectile motion", "Phân tích chuyển động ném") },
        { id: "relative-motion", label: t("Change reference frames", "Thay đổi hệ quy chiếu") },
        { id: "learning-support", label: t("Find learning support", "Tìm hỗ trợ học tập") },
      ]}
    >
      <aside
        className="lesson-audio-bar"
        aria-label={t("Original lecture audio", "Bản ghi âm bài giảng gốc")}
        data-focus-optional="true"
      >
        <p><strong>{t("Original lecture audio", "Bản ghi âm bài giảng gốc")}</strong> · 1:29:33</p>
        <audio
          id="kinematics-lecture-audio"
          controls
          preload="metadata"
          aria-describedby="kinematics-lecture-audio-help"
        >
          <source src="/kinematics-week-2-lecture.m4a" type="audio/mp4" />
        </audio>
        <p id="kinematics-lecture-audio-help" className="lesson-audio-help">
          {t(
            "Optional. Transcript buttons beside lesson headings reveal the matching AI-assisted transcript and can start this recording at that point.",
            "Không bắt buộc. Các nút Bản chép lời bên cạnh tiêu đề mở phần bản chép lời tương ứng do AI hỗ trợ và có thể phát bản ghi từ thời điểm đó.",
          )}
        </p>
      </aside>

      <p className="lesson-language-review-note" aria-live="polite">
        {t(
          "The complete Vietnamese pathway was translated with AI assistance and reviewed by the bilingual teacher for this demonstration.",
          "Toàn bộ nội dung tiếng Việt được dịch với sự hỗ trợ của AI và đã được giáo viên song ngữ xem lại cho bản minh họa này.",
        )}
      </p>

      <aside
        className="lesson-problem-reference"
        aria-labelledby="problem-solving-checklist-title"
      >
        <h2 id="problem-solving-checklist-title">{t("Problem-solving checklist", "Danh sách kiểm tra khi giải bài")}</h2>
        <p>
          {t(
            "Use this checklist before choosing an equation and again after calculating. It helps you keep assumptions, signs, units, and the final result consistent.",
            "Dùng danh sách này trước khi chọn phương trình và kiểm tra lại sau khi tính. Danh sách giúp bạn giữ nhất quán các giả thiết, dấu, đơn vị và kết quả cuối cùng.",
          )}
        </p>
        <ol>
          <li>{t("Choose the axis and positive direction before assigning signs.", "Chọn trục và chiều dương trước khi gán dấu.")}</li>
          <li>{t("List the known and unknown quantities with their units.", "Liệt kê các đại lượng đã biết và chưa biết cùng đơn vị.")}</li>
          <li>{t("Use constant-acceleration equations only when acceleration is constant.", "Chỉ dùng các phương trình gia tốc không đổi khi gia tốc thực sự không đổi.")}</li>
          <li>{t("For projectile motion, use the same elapsed time for horizontal and vertical components.", "Trong chuyển động ném, dùng cùng một khoảng thời gian cho thành phần ngang và thẳng đứng.")}</li>
          <li>{t("Check whether the final sign, unit, and magnitude fit the physical situation.", "Kiểm tra xem dấu, đơn vị và độ lớn cuối cùng có phù hợp với tình huống vật lý không.")}</li>
        </ol>
      </aside>

      <section id="lesson-overview" aria-labelledby="lesson-overview-title">
        <LectureHeading
          level={2}
          headingId="lesson-overview-title"
          points={[vi ? vietnameseKinematicsTranscriptPoints.lectureScope : kinematicsTranscriptPoints.lectureScope]}
          language={language}
        >
          {t("Week 2 lecture overview", "Tổng quan bài giảng Tuần 2")}
        </LectureHeading>
        <p>
          {t(
            "OENG1209 Engineering Science · Kinematics · Dr Cuong Tan Nguyen. Kinematics describes motion in one dimension and in a two-dimensional plane.",
            "OENG1209 Khoa học Kỹ thuật · Động học · TS Cuong Tan Nguyen. Động học mô tả chuyển động trong một chiều và trên mặt phẳng hai chiều.",
          )}
        </p>
        <h3>{t("Topics from the lecture", "Các chủ đề trong bài giảng")}</h3>
        <ol>
          <li>{t("Velocity and acceleration in one dimension.", "Vận tốc và gia tốc trong chuyển động một chiều.")}</li>
          <li>{t("Constant-acceleration motion.", "Chuyển động với gia tốc không đổi.")}</li>
          <li>{t("Free-fall motion.", "Chuyển động rơi tự do.")}</li>
          <li>{t("Projectile motion in a two-dimensional plane.", "Chuyển động ném trên mặt phẳng hai chiều.")}</li>
          <li>{t("Relative motion and reference frames.", "Chuyển động tương đối và hệ quy chiếu.")}</li>
        </ol>
      </section>

      <section id="displacement" aria-labelledby="displacement-title">
        <LectureHeading
          level={2}
          headingId="displacement-title"
          points={[vi ? vietnameseKinematicsTranscriptPoints.displacementAndAverageVelocity : kinematicsTranscriptPoints.displacementAndAverageVelocity]}
          language={language}
        >
          {t("Describe one-dimensional motion", "Mô tả chuyển động một chiều")}
        </LectureHeading>
        <p>
          {t(
            "Kinematics describes how position changes. Choose a positive direction before calculating so every displacement, velocity, and acceleration uses the same sign convention.",
            "Động học mô tả sự thay đổi vị trí. Hãy chọn chiều dương trước khi tính để mọi độ dời, vận tốc và gia tốc đều dùng cùng một quy ước dấu.",
          )}
        </p>
        <p>
          {t(
            "In the lecture's car illustration, the car moves from initial point A at x initial to final point B at x final. The arrow from A to B is the displacement Δx = x final − x initial; reversing the direction reverses its sign.",
            "Trong hình minh họa chiếc xe của bài giảng, xe đi từ điểm đầu A tại x ban đầu đến điểm cuối B tại x cuối. Mũi tên từ A đến B là độ dời Δx = x cuối − x ban đầu; đảo chiều chuyển động sẽ đảo dấu của độ dời.",
          )}
        </p>
        <CognitiveSupport
          sectionId="displacement"
          heading={t("Key points", "Ý chính")}
          summary={t("Plain explanation", "Giải thích đơn giản")}
          keyPoints={vi ? [
            "Chọn một chiều dương trước khi gán dấu.",
            "Độ dốc của đồ thị vị trí–thời gian cho vận tốc; độ dốc của đồ thị vận tốc–thời gian cho gia tốc.",
          ] : [
            "Choose one positive direction before assigning signs.",
            "A position-time slope gives velocity; a velocity-time slope gives acceleration.",
          ]}
        >
          <p>
            {t(
              "Position describes where an object is. Displacement describes how its position changes, including direction. Velocity describes how quickly position changes, and acceleration describes how quickly velocity changes.",
              "Vị trí cho biết vật đang ở đâu. Độ dời cho biết vị trí thay đổi như thế nào, bao gồm cả hướng. Vận tốc cho biết vị trí thay đổi nhanh đến mức nào, còn gia tốc cho biết vận tốc thay đổi nhanh đến mức nào.",
            )}
          </p>
        </CognitiveSupport>
        <VocabularyList
          labelledBy="displacement-title"
          language={language}
          terms={vi ? [
            { term: "Độ dời", definition: "Độ thay đổi vị trí từ giá trị ban đầu đến giá trị cuối.", example: "Δx = x cuối − x ban đầu." },
            { term: "Vận tốc trung bình", definition: "Độ dời chia cho khoảng thời gian đã trôi qua.", example: "v trung bình = Δx / Δt." },
            { term: "Vận tốc tức thời", definition: "Tốc độ thay đổi vị trí tại một thời điểm.", example: "v = dx/dt, là độ dốc tiếp tuyến trên đồ thị vị trí–thời gian." },
            { term: "Gia tốc", definition: "Tốc độ thay đổi của vận tốc.", example: "Đạp ga có thể làm tăng tốc độ; phanh có thể tạo gia tốc ngược với chiều dương của chuyển động." },
          ] : [
            {
              term: "Displacement",
              definition: "The change in position from an initial value to a final value.",
              example: "Delta x = x final - x initial.",
            },
            {
              term: "Average velocity",
              definition: "Displacement divided by the elapsed time.",
              example: "Average v = Delta x / Delta t.",
            },
            {
              term: "Instantaneous velocity",
              definition: "The rate of change of position at one instant.",
              example: "v = dx/dt, the tangent slope on a position-time graph.",
            },
            {
              term: "Acceleration",
              definition: "The rate at which velocity changes.",
              example: "The gas pedal can increase speed; the brake can produce acceleration opposite a positive direction of travel.",
            },
          ]}
        />

        <LectureHeading
          level={3}
          headingId="one-dimensional-equations-title"
          points={[vi ? vietnameseKinematicsTranscriptPoints.instantaneousVelocity : kinematicsTranscriptPoints.instantaneousVelocity]}
          language={language}
        >
          {t("Definitions and graph slopes", "Định nghĩa và độ dốc đồ thị")}
        </LectureHeading>
        <AccessibleMathRegion labelledBy="one-dimensional-equations-title">
          <math display="block">
            <mtable columnalign="left">
              <mtr>
                <mtd><mi>Δx</mi><mo>=</mo><msub><mi>x</mi><mi>f</mi></msub><mo>−</mo><msub><mi>x</mi><mi>i</mi></msub></mtd>
                <mtd><mtext>{t("displacement", "độ dời")}</mtext></mtd>
              </mtr>
              <mtr>
                <mtd><mover><mi>v</mi><mo>¯</mo></mover><mo>=</mo><mfrac><mi>Δx</mi><mi>Δt</mi></mfrac><mo>=</mo><mfrac><mrow><msub><mi>x</mi><mi>f</mi></msub><mo>−</mo><msub><mi>x</mi><mi>i</mi></msub></mrow><mrow><msub><mi>t</mi><mi>f</mi></msub><mo>−</mo><msub><mi>t</mi><mi>i</mi></msub></mrow></mfrac></mtd>
                <mtd><mtext>{t("average velocity", "vận tốc trung bình")}</mtext></mtd>
              </mtr>
              <mtr>
                <mtd><mi>v</mi><mo>=</mo><munder><mi>lim</mi><mrow><mi>Δt</mi><mo>→</mo><mn>0</mn></mrow></munder><mfrac><mi>Δx</mi><mi>Δt</mi></mfrac><mo>=</mo><mfrac><mrow><mi>d</mi><mi>x</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac></mtd>
                <mtd><mtext>{t("instantaneous velocity", "vận tốc tức thời")}</mtext></mtd>
              </mtr>
              <mtr>
                <mtd><mover><mi>a</mi><mo>¯</mo></mover><mo>=</mo><mfrac><mi>Δv</mi><mi>Δt</mi></mfrac><mo>=</mo><mfrac><mrow><msub><mi>v</mi><mi>f</mi></msub><mo>−</mo><msub><mi>v</mi><mi>i</mi></msub></mrow><mrow><msub><mi>t</mi><mi>f</mi></msub><mo>−</mo><msub><mi>t</mi><mi>i</mi></msub></mrow></mfrac></mtd>
                <mtd><mtext>{t("average acceleration", "gia tốc trung bình")}</mtext></mtd>
              </mtr>
              <mtr>
                <mtd><mi>a</mi><mo>=</mo><munder><mi>lim</mi><mrow><mi>Δt</mi><mo>→</mo><mn>0</mn></mrow></munder><mfrac><mi>Δv</mi><mi>Δt</mi></mfrac><mo>=</mo><mfrac><mrow><mi>d</mi><mi>v</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac></mtd>
                <mtd><mtext>{t("instantaneous acceleration", "gia tốc tức thời")}</mtext></mtd>
              </mtr>
            </mtable>
          </math>
        </AccessibleMathRegion>
        <p>
          {t(
            "On a position–time graph, the secant between two points has slope “vertical change divided by horizontal change” and gives average velocity. As the second point approaches the first, the secant becomes a tangent and its slope gives instantaneous velocity.",
            "Trên đồ thị vị trí–thời gian, cát tuyến qua hai điểm có độ dốc bằng “độ thay đổi theo phương đứng chia cho độ thay đổi theo phương ngang” và cho vận tốc trung bình. Khi điểm thứ hai tiến gần điểm thứ nhất, cát tuyến trở thành tiếp tuyến và độ dốc của nó cho vận tốc tức thời.",
          )}
        </p>
        <SecantTangentFigure language={language} />
        <LectureHeading
          level={3}
          headingId="motion-relationships-title"
          points={[vi ? vietnameseKinematicsTranscriptPoints.accelerationDefinition : kinematicsTranscriptPoints.accelerationDefinition]}
          language={language}
        >
          {t("Connect the quantities", "Liên hệ các đại lượng")}
        </LectureHeading>
        <RelationshipExplorer
          labelledBy="motion-relationships-title"
          language={language}
          relationships={vi ? [
            { from: "Vị trí đầu và cuối", relation: "lấy hiệu để tìm", to: "độ dời", explanation: "Δx = x cuối − x ban đầu, vì vậy độ dời bao gồm cả hướng.", conclusion: "Độ dời âm nghĩa là vị trí cuối nằm theo chiều âm đã chọn.", sourceAnchor: "displacement" },
            { from: "Đồ thị vị trí–thời gian", relation: "độ dốc cho", to: "vận tốc", explanation: "Độ dốc cát tuyến cho vận tốc trung bình; độ dốc tiếp tuyến cho vận tốc tức thời.", conclusion: "Đồ thị vị trí–thời gian càng dốc thì độ lớn vận tốc càng lớn.", sourceAnchor: "displacement" },
            { from: "Đồ thị vận tốc–thời gian", relation: "độ dốc cho", to: "gia tốc", explanation: "Gia tốc đo độ thay đổi vận tốc trong mỗi đơn vị thời gian.", conclusion: "Gia tốc không đổi xuất hiện dưới dạng đường thẳng trên đồ thị vận tốc–thời gian.", sourceAnchor: "constant-acceleration" },
          ] : [
            {
              from: "Initial and final position",
              relation: "subtract to find",
              to: "displacement",
              explanation: "Delta x = x final - x initial, so displacement includes direction.",
              conclusion: "A negative displacement means the final position lies in the chosen negative direction.",
              sourceAnchor: "displacement",
            },
            {
              from: "Position-time graph",
              relation: "slope gives",
              to: "velocity",
              explanation: "A secant slope gives average velocity; the tangent slope gives instantaneous velocity.",
              conclusion: "A steeper position-time graph has a velocity with greater magnitude.",
              sourceAnchor: "displacement",
            },
            {
              from: "Velocity-time graph",
              relation: "slope gives",
              to: "acceleration",
              explanation: "Acceleration measures the change in velocity per unit time.",
              conclusion: "Constant acceleration appears as a straight line on a velocity-time graph.",
              sourceAnchor: "constant-acceleration",
            },
          ]}
        />
        <LectureHeading
          level={3}
          headingId="acceleration-cases-title"
          points={[vi ? vietnameseKinematicsTranscriptPoints.accelerationSigns : kinematicsTranscriptPoints.accelerationSigns]}
          language={language}
        >
          {t("Interpret the motion illustrations", "Giải thích các hình minh họa chuyển động")}
        </LectureHeading>
        <DataTableRegion labelledBy="acceleration-cases-title">
          <table>
            <caption>{t("Acceleration signs shown in the lecture", "Dấu của gia tốc trong bài giảng")}</caption>
            <thead><tr><th scope="col">{t("Motion", "Chuyển động")}</th><th scope="col">{t("Acceleration", "Gia tốc")}</th><th scope="col">{t("Meaning", "Ý nghĩa")}</th></tr></thead>
            <tbody>
              <tr><td>{t("Moving in the positive direction and speeding up", "Chuyển động theo chiều dương và nhanh dần")}</td><td>{t("Positive", "Dương")}</td><td>{t("Velocity becomes more positive.", "Vận tốc trở nên dương hơn.")}</td></tr>
              <tr><td>{t("Moving in the positive direction and slowing down", "Chuyển động theo chiều dương và chậm dần")}</td><td>{t("Negative", "Âm")}</td><td>{t("A brake can produce acceleration opposite the motion.", "Phanh có thể tạo gia tốc ngược chiều chuyển động.")}</td></tr>
              <tr><td>{t("Moving in the negative direction at constant velocity", "Chuyển động theo chiều âm với vận tốc không đổi")}</td><td>{t("Zero", "Bằng không")}</td><td>{t("Velocity is negative but is not changing.", "Vận tốc âm nhưng không thay đổi.")}</td></tr>
            </tbody>
          </table>
        </DataTableRegion>
      </section>

      <section id="constant-acceleration" aria-labelledby="constant-title">
        <h2 id="constant-title">{t("Use constant acceleration", "Sử dụng gia tốc không đổi")}</h2>
        <p>
          {t(
            "These equations apply only when acceleration is constant. Delta x is the displacement x - x zero, v zero is the initial velocity, and t is the elapsed time from the chosen initial instant.",
            "Các phương trình này chỉ áp dụng khi gia tốc không đổi. Δx là độ dời x − x₀, v₀ là vận tốc ban đầu và t là thời gian tính từ thời điểm ban đầu đã chọn.",
          )}
        </p>
        <OptionalContextIllustration
          visual={(
            // eslint-disable-next-line @next/next/no-img-element -- Vinext does not serve local assets through Next image optimization.
            <img className="lesson-context-image" src="/illustrations/constant-acceleration-context.webp" alt="" width={1536} height={1024} loading="lazy" decoding="async" />
          )}
          caption={t("A car in motion", "Một chiếc xe đang chuyển động")}
          description={t(
            "A single compact car travels along a level campus road. This optional image provides familiar context; the adaptive diagram, equations, and data below contain the instructional detail.",
            "Một chiếc xe nhỏ đang chạy trên con đường bằng phẳng trong khuôn viên trường. Hình ảnh không bắt buộc này cung cấp bối cảnh quen thuộc; sơ đồ thích ứng, các phương trình và dữ liệu bên dưới chứa nội dung học tập chi tiết.",
          )}
        />
        <CognitiveSupport
          sectionId="constant-acceleration"
          heading={t("Key points", "Ý chính")}
          summary={t("Plain explanation", "Giải thích đơn giản")}
          keyPoints={vi ? [
            "Chỉ dùng các phương trình này khi gia tốc không đổi.",
            "Chọn phương trình dựa trên các đại lượng đã biết và chưa biết, sau đó kiểm tra đơn vị và dấu.",
          ] : [
            "Use these equations only when acceleration remains constant.",
            "Choose an equation from the known and unknown quantities, then check units and signs.",
          ]}
        >
          <p>
            {t(
              "Constant acceleration means velocity changes by the same amount in each equal time interval. The equations connect initial velocity, acceleration, elapsed time, displacement, and final velocity.",
              "Gia tốc không đổi nghĩa là vận tốc thay đổi một lượng như nhau trong mỗi khoảng thời gian bằng nhau. Các phương trình liên hệ vận tốc ban đầu, gia tốc, thời gian, độ dời và vận tốc cuối.",
            )}
          </p>
        </CognitiveSupport>
        <nav className="lesson-topic-nav" aria-labelledby="constant-topics-title">
          <h3 id="constant-topics-title">{t("In this section", "Trong phần này")}</h3>
          <ol>
            <li><a href="#interactive-explorer-title">{t("Explore changing variables", "Khám phá sự thay đổi của các biến")}</a></li>
            <li><a href="#constant-equations-title">{t("Use and choose equations", "Sử dụng và chọn phương trình")}</a></li>
            <li><a href="#constant-derivations-title">{t("Derive the relationships", "Suy ra các mối quan hệ")}</a></li>
            <li><a href="#constant-graphs-title">{t("Read the graph shapes", "Đọc hình dạng đồ thị")}</a></li>
            <li><a href="#race-car-title">{t("Work through the race-car example", "Giải ví dụ xe đua")}</a></li>
          </ol>
        </nav>

        <div className="lesson-topic-block">
          <h3 id="interactive-explorer-title">{t("Explore changing variables", "Khám phá sự thay đổi của các biến")}</h3>
          <p>
            {t(
              "This interactive application uses the lecture's constant-acceleration equations. Change the variables and inspect the result visually, numerically, or as a text conclusion.",
              "Ứng dụng tương tác này dùng các phương trình gia tốc không đổi trong bài giảng. Hãy thay đổi các biến và xem kết quả qua hình ảnh, số liệu hoặc kết luận bằng văn bản.",
            )}
          </p>
          <ConstantAccelerationExplorer language={language} />
        </div>

        <div className="lesson-topic-block">
          <LectureHeading
            level={3}
            headingId="constant-equations-title"
            points={[vi ? vietnameseKinematicsTranscriptPoints.constantVelocity : kinematicsTranscriptPoints.constantVelocity]}
            language={language}
          >
            {t("Three useful relationships", "Ba mối quan hệ hữu ích")}
          </LectureHeading>
          <AccessibleMathRegion labelledBy="constant-equations-title">
            <math display="block">
              <mtable columnalign="left">
                <mtr>
                  <mtd><mi>v</mi><mo>=</mo><msub><mi>v</mi><mn>0</mn></msub><mo>+</mo><mi>a</mi><mi>t</mi></mtd>
                  <mtd><mtext>{t("velocity from time", "vận tốc theo thời gian")}</mtext></mtd>
                </mtr>
                <mtr>
                  <mtd><mi>Δx</mi><mo>=</mo><msub><mi>v</mi><mn>0</mn></msub><mi>t</mi><mo>+</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi><msup><mi>t</mi><mn>2</mn></msup></mtd>
                  <mtd><mtext>{t("displacement from time", "độ dời theo thời gian")}</mtext></mtd>
                </mtr>
                <mtr>
                  <mtd><msup><mi>v</mi><mn>2</mn></msup><mo>=</mo><msubsup><mi>v</mi><mn>0</mn><mn>2</mn></msubsup><mo>+</mo><mn>2</mn><mi>a</mi><mi>Δx</mi></mtd>
                  <mtd><mtext>{t("velocity from displacement", "vận tốc theo độ dời")}</mtext></mtd>
                </mtr>
              </mtable>
            </math>
          </AccessibleMathRegion>
          <h3 id="equation-table-title">{t("Choose an equation from the known values", "Chọn phương trình từ các giá trị đã biết")}</h3>
          <DataTableRegion labelledBy="equation-table-title">
            <table>
              <caption>{t("Choose a constant-acceleration equation from the known and unknown quantities", "Chọn phương trình gia tốc không đổi dựa trên các đại lượng đã biết và chưa biết")}</caption>
              <thead>
                <tr>
                  <th scope="col">{t("If the problem gives", "Nếu đề bài cho")}</th>
                  <th scope="col">{t("And asks for", "Và yêu cầu tìm")}</th>
                  <th scope="col">{t("Start with", "Bắt đầu với")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>{t("v zero, a, t", "v₀, a, t")}</td><td>v</td><td>{t("v = v zero + at", "v = v₀ + at")}</td></tr>
                <tr><td>{t("v zero, a, t", "v₀, a, t")}</td><td>Δx</td><td>{t("Delta x = v zero t + one-half at squared", "Δx = v₀t + ½at²")}</td></tr>
                <tr><td>{t("v zero, a, Delta x", "v₀, a, Δx")}</td><td>v</td><td>{t("v squared = v zero squared + 2a Delta x", "v² = v₀² + 2aΔx")}</td></tr>
              </tbody>
            </table>
          </DataTableRegion>

          <h3>{t("Follow the reasoning", "Theo dõi quá trình lập luận")}</h3>
          <ol className="source-steps">
            <li><strong>{t("Choose the axis and positive direction.", "Chọn trục và chiều dương.")}</strong> {t("Write every position, velocity, and acceleration using that convention.", "Biểu diễn mọi vị trí, vận tốc và gia tốc theo quy ước đó.")}</li>
            <li><strong>{t("List known and unknown quantities.", "Liệt kê các đại lượng đã biết và chưa biết.")}</strong> {t("Include units and distinguish vectors or signed components from magnitudes.", "Ghi đơn vị và phân biệt vectơ hoặc thành phần có dấu với độ lớn.")}</li>
            <li><strong>{t("Choose an equation without an extra unknown.", "Chọn phương trình không có thêm ẩn số.")}</strong> {t("Use only a constant-acceleration equation that matches the available quantities.", "Chỉ dùng phương trình gia tốc không đổi phù hợp với các đại lượng hiện có.")}</li>
            <li><strong>{t("Calculate and interpret.", "Tính toán và giải thích.")}</strong> {t("Check units, sign, magnitude, and whether the result is physically reasonable.", "Kiểm tra đơn vị, dấu, độ lớn và tính hợp lý về mặt vật lý của kết quả.")}</li>
          </ol>
        </div>

        <div className="lesson-topic-block">
          <LectureHeading
            level={3}
            headingId="constant-derivations-title"
            points={vi ? [
              vietnameseKinematicsTranscriptPoints.constantDisplacement,
              vietnameseKinematicsTranscriptPoints.constantIntegration,
            ] : [
              kinematicsTranscriptPoints.constantDisplacement,
              kinematicsTranscriptPoints.constantIntegration,
            ]}
            language={language}
          >
            {t("Derive the relationships", "Suy ra các mối quan hệ")}
          </LectureHeading>
          <ol className="source-steps">
            <li><strong>{t("Start from the definition of constant acceleration.", "Bắt đầu từ định nghĩa gia tốc không đổi.")}</strong> {t("a = (v final − v initial) / (t final − t initial). Set the initial time to zero, the elapsed final time to t, v initial to v₀, and v final to v. Rearranging gives v = v₀ + at.", "a = (v cuối − v đầu) / (t cuối − t đầu). Đặt thời điểm đầu bằng không, thời gian cuối đã trôi qua là t, vận tốc đầu là v₀ và vận tốc cuối là v. Biến đổi được v = v₀ + at.")}</li>
            <li><strong>{t("Use the average velocity for a straight velocity-time line.", "Dùng vận tốc trung bình cho đường thẳng vận tốc–thời gian.")}</strong> {t("For constant acceleration, average velocity is (v₀ + v) / 2. Since displacement is average velocity multiplied by elapsed time, Δx = [(v₀ + v) / 2]t.", "Với gia tốc không đổi, vận tốc trung bình là (v₀ + v) / 2. Vì độ dời bằng vận tốc trung bình nhân với thời gian, Δx = [(v₀ + v) / 2]t.")}</li>
            <li><strong>{t("Substitute the velocity relationship.", "Thay quan hệ vận tốc vào.")}</strong> {t("Substituting v = v₀ + at gives Δx = v₀t + ½at². Eliminating time between the equations gives v² = v₀² + 2aΔx.", "Thay v = v₀ + at được Δx = v₀t + ½at². Khử thời gian giữa các phương trình được v² = v₀² + 2aΔx.")}</li>
            <li><strong>{t("Confirm the result by integration.", "Xác nhận kết quả bằng tích phân.")}</strong> {t("Integrate a = dv/dt from v₀ to v to obtain v = v₀ + at. Then integrate v = dx/dt = v₀ + at from x₀ to x to obtain x − x₀ = v₀t + ½at².", "Tích phân a = dv/dt từ v₀ đến v để được v = v₀ + at. Sau đó tích phân v = dx/dt = v₀ + at từ x₀ đến x để được x − x₀ = v₀t + ½at².")}</li>
          </ol>
        </div>

        <div className="lesson-topic-block">
          <LectureHeading
            level={3}
            headingId="constant-graphs-title"
            points={[vi ? vietnameseKinematicsTranscriptPoints.constantGraphs : kinematicsTranscriptPoints.constantGraphs]}
            language={language}
          >
            {t("Read the three graph shapes", "Đọc ba dạng đồ thị")}
          </LectureHeading>
          <DataTableRegion labelledBy="constant-graphs-title">
            <table>
              <caption>{t("Graph relationships for constant acceleration", "Quan hệ đồ thị của chuyển động gia tốc không đổi")}</caption>
              <thead><tr><th scope="col">{t("Graph", "Đồ thị")}</th><th scope="col">{t("Shape", "Hình dạng")}</th><th scope="col">{t("What its slope means", "Ý nghĩa của độ dốc")}</th></tr></thead>
              <tbody>
                <tr><td>{t("Acceleration against time", "Gia tốc theo thời gian")}</td><td>{t("Horizontal line at a", "Đường ngang tại a")}</td><td>{t("Acceleration remains constant.", "Gia tốc không đổi.")}</td></tr>
                <tr><td>{t("Velocity against time", "Vận tốc theo thời gian")}</td><td>{t("Straight line, v = v₀ + at", "Đường thẳng, v = v₀ + at")}</td><td>{t("The slope is acceleration a.", "Độ dốc là gia tốc a.")}</td></tr>
                <tr><td>{t("Position against time", "Vị trí theo thời gian")}</td><td>{t("Quadratic curve, x = x₀ + v₀t + ½at²", "Đường cong bậc hai, x = x₀ + v₀t + ½at²")}</td><td>{t("The tangent slope is instantaneous velocity.", "Độ dốc tiếp tuyến là vận tốc tức thời.")}</td></tr>
              </tbody>
            </table>
          </DataTableRegion>
        </div>

        <div className="lesson-topic-block">
          <LectureHeading
            level={3}
            headingId="race-car-title"
            points={[vi ? vietnameseKinematicsTranscriptPoints.raceCarExample : kinematicsTranscriptPoints.raceCarExample]}
            language={language}
          >
            {t("Lecture example: accelerating race car", "Ví dụ trong bài giảng: xe đua tăng tốc")}
          </LectureHeading>
          <p>
            {t(
              "A race car starts from rest, accelerates constantly at 5.00 metres per second squared, and travels 100 feet, or 30.5 metres.",
              "Một chiếc xe đua xuất phát từ trạng thái nghỉ, tăng tốc đều với gia tốc 5,00 m/s² và đi được 100 feet, tương đương 30,5 mét.",
            )}
          </p>
          <ol className="source-steps">
            <li><strong>{t("Find the final speed.", "Tìm tốc độ cuối.")}</strong> {t("Use v² = v₀² + 2aΔx: v = √(2 × 5.00 × 30.5) = √305 = 17.5 metres per second.", "Dùng v² = v₀² + 2aΔx: v = √(2 × 5,00 × 30,5) = √305 = 17,5 m/s.")}</li>
            <li><strong>{t("Find the elapsed time.", "Tìm thời gian đã trôi qua.")}</strong> {t("Use v = v₀ + at: t = 17.5 / 5.00 ≈ 3.5 seconds.", "Dùng v = v₀ + at: t = 17,5 / 5,00 ≈ 3,5 giây.")}</li>
            <li><strong>{t("Compare average-velocity calculations.", "So sánh các phép tính vận tốc trung bình.")}</strong> {t("(17.5 + 0) / 2 = 8.75 metres per second. Using the rounded time gives 30.5 / 3.5 ≈ 8.71 metres per second; the small difference is rounding.", "(17,5 + 0) / 2 = 8,75 m/s. Dùng thời gian đã làm tròn cho 30,5 / 3,5 ≈ 8,71 m/s; sai khác nhỏ là do làm tròn.")}</li>
          </ol>
        </div>
      </section>

      <section id="free-fall" aria-labelledby="free-fall-title">
        <h2 id="free-fall-title">{t("Model free fall", "Mô hình hóa rơi tự do")}</h2>
        <p>
          {t(
            "In ideal free fall, gravity is the only force that affects the motion and air resistance is negligible. Near Earth's surface, use g = 9.81 metres per second squared. If upward is positive, a sub y = -g.",
            "Trong rơi tự do lý tưởng, trọng lực là lực duy nhất ảnh hưởng đến chuyển động và lực cản không khí không đáng kể. Gần bề mặt Trái Đất, dùng g = 9,81 m/s². Nếu chọn chiều dương hướng lên thì aᵧ = −g.",
          )}
        </p>
        <OptionalContextIllustration
          visual={(
            // eslint-disable-next-line @next/next/no-img-element -- Vinext does not serve local assets through Next image optimization.
            <img className="lesson-context-image" src="/illustrations/free-fall-context.webp" alt="" width={1536} height={1024} loading="lazy" decoding="async" />
          )}
          caption={t("Releasing a ball", "Thả một quả bóng")}
          description={t(
            "An open hand has released one ball above a padded gym mat. This optional image provides familiar context; the adaptive diagram and explanation below describe the ideal free-fall model.",
            "Một bàn tay mở vừa thả một quả bóng phía trên tấm đệm trong phòng tập. Hình ảnh không bắt buộc này cung cấp bối cảnh quen thuộc; sơ đồ thích ứng và phần giải thích bên dưới mô tả mô hình rơi tự do lý tưởng.",
          )}
        />
        <CognitiveSupport
          sectionId="free-fall"
          heading={t("Key points", "Ý chính")}
          summary={t("Plain explanation", "Giải thích đơn giản")}
          keyPoints={vi ? [
            "Khi lực cản không khí không đáng kể, khối lượng và hình dạng không làm thay đổi gia tốc rơi tự do.",
            "Dấu của g phụ thuộc vào trục đã chọn; g mang dấu âm khi chiều dương hướng lên.",
          ] : [
            "With negligible air resistance, mass and shape do not change free-fall acceleration.",
            "The sign of g follows the chosen axis; it is negative when upward is positive.",
          ]}
        >
          <p>
            {t(
              "Free fall is constant-acceleration motion caused only by gravity. Near Earth, every object has the same downward acceleration when air resistance is ignored, so the usual constant-acceleration equations apply.",
              "Rơi tự do là chuyển động gia tốc không đổi chỉ do trọng lực gây ra. Gần Trái Đất, mọi vật có cùng gia tốc hướng xuống khi bỏ qua lực cản không khí, vì vậy có thể dùng các phương trình gia tốc không đổi thông thường.",
            )}
          </p>
        </CognitiveSupport>
        <LectureHeading
          level={3}
          headingId="free-fall-demonstration-title"
          points={[vi ? vietnameseKinematicsTranscriptPoints.freeFallDemonstration : kinematicsTranscriptPoints.freeFallDemonstration]}
          language={language}
        >
          {t("Does a heavier object fall faster?", "Vật nặng hơn có rơi nhanh hơn không?")}
        </LectureHeading>
        <p>
          {t(
            "No—not in true free fall. When air resistance is negligible, mass and shape do not change the acceleration. A feather and a bowling ball released together in a vacuum fall with the same acceleration. The lecture links to a",
            "Không—nếu là rơi tự do thực sự. Khi lực cản không khí không đáng kể, khối lượng và hình dạng không làm thay đổi gia tốc. Một chiếc lông vũ và một quả bóng bowling được thả cùng lúc trong chân không sẽ rơi với cùng gia tốc. Bài giảng liên kết đến",
          )}
          {" "}<a href="https://www.youtube.com/watch?v=E43-CfukEgs">{t("vacuum free-fall demonstration", "video minh họa rơi tự do trong chân không")}</a>.
        </p>
        <LectureHeading
          level={3}
          headingId="free-fall-equation-title"
          points={[vi ? vietnameseKinematicsTranscriptPoints.freeFallEquations : kinematicsTranscriptPoints.freeFallEquations]}
          language={language}
        >
          {t("Upward-positive free-fall equations", "Phương trình rơi tự do khi chọn chiều dương hướng lên")}
        </LectureHeading>
        <AccessibleMathRegion labelledBy="free-fall-equation-title">
          <math display="block">
            <mtable columnalign="left">
              <mtr><mtd><mi>v</mi><mo>=</mo><msub><mi>v</mi><mn>0</mn></msub><mo>−</mo><mi>g</mi><mi>t</mi></mtd><mtd><mtext>{t("vertical velocity", "vận tốc thẳng đứng")}</mtext></mtd></mtr>
              <mtr><mtd><mi>Δy</mi><mo>=</mo><msub><mi>v</mi><mn>0</mn></msub><mi>t</mi><mo>−</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>g</mi><msup><mi>t</mi><mn>2</mn></msup></mtd><mtd><mtext>{t("vertical displacement", "độ dời thẳng đứng")}</mtext></mtd></mtr>
              <mtr><mtd><msup><mi>v</mi><mn>2</mn></msup><mo>=</mo><msubsup><mi>v</mi><mn>0</mn><mn>2</mn></msubsup><mo>−</mo><mn>2</mn><mi>g</mi><mi>Δy</mi></mtd><mtd><mtext>{t("velocity from displacement", "vận tốc theo độ dời")}</mtext></mtd></mtr>
              <mtr><mtd><mi>t</mi><mo>=</mo><msqrt><mfrac><mrow><mn>2</mn><mi>h</mi></mrow><mi>g</mi></mfrac></msqrt></mtd><mtd><mtext>{t("fall time when released from rest through downward distance h", "thời gian rơi từ trạng thái nghỉ qua quãng đường h hướng xuống")}</mtext></mtd></mtr>
            </mtable>
          </math>
        </AccessibleMathRegion>
        <p>
          {t(
            "The minus sign comes from the chosen upward-positive axis, not from a separate free-fall rule. Choose downward as positive and the sign of g changes consistently.",
            "Dấu âm xuất phát từ việc chọn chiều dương hướng lên, không phải từ một quy tắc rơi tự do riêng. Nếu chọn chiều dương hướng xuống thì dấu của g cũng thay đổi nhất quán.",
          )}
        </p>
      </section>

      <section id="projectile-motion" aria-labelledby="projectile-title">
        <LectureHeading
          level={2}
          headingId="projectile-title"
          points={[
            vi
              ? vietnameseKinematicsTranscriptPoints.projectileIntroduction
              : kinematicsTranscriptPoints.projectileIntroduction,
          ]}
          language={language}
        >
          {t("Resolve projectile motion", "Phân tích chuyển động ném")}
        </LectureHeading>
          <p>
            {vi
              ? "Xét chuyển động ngang và chuyển động thẳng đứng như hai thành phần dùng cùng một thời gian. Khi bỏ qua lực cản không khí, gia tốc ngang bằng không và gia tốc thẳng đứng bằng −g nếu chọn chiều dương hướng lên."
              : "Treat horizontal and vertical motion as two components with the same elapsed time. With negligible air resistance, horizontal acceleration is zero and vertical acceleration is -g when upward is positive."}
          </p>
          <p>
            {vi
              ? "Sơ đồ trong bài giảng mô tả một vật được ném với tốc độ v₀ và góc θ. Vận tốc được tách thành thành phần ngang v₀ cos θ và thành phần thẳng đứng v₀ sin θ. Các vị trí liên tiếp cách đều theo phương ngang vì vận tốc ngang không đổi; khoảng cách theo phương thẳng đứng thay đổi do trọng lực, tạo thành quỹ đạo parabol."
              : "The lecture diagram shows a projectile launched at speed v₀ and angle θ. Its velocity splits into a horizontal component v₀ cos θ and a vertical component v₀ sin θ. Successive positions are equally spaced horizontally because horizontal velocity is constant; their vertical spacing changes under gravity, producing a parabolic path."}
          </p>
          <OptionalContextIllustration
            visual={(
              // eslint-disable-next-line @next/next/no-img-element -- Vinext does not serve local assets through Next image optimization.
              <img className="lesson-context-image" src="/illustrations/projectile-motion-context.webp" alt="" width={1536} height={1024} loading="lazy" decoding="async" />
            )}
            caption={vi ? "Sau khi thả quả bóng" : "After releasing a ball"}
            description={vi
              ? "Một sinh viên tiếp tục động tác sau khi thả một quả bóng qua sân trường. Hình ảnh không bắt buộc này cung cấp bối cảnh quen thuộc; các phương trình, mô hình tương tác và dữ liệu bên dưới mô tả chuyển động ném."
              : "A student follows through after releasing one ball across a campus field. This optional image provides familiar context; the equations, interactive model, and data below describe projectile motion."}
          />
          <CognitiveSupport
            sectionId="projectile-motion"
            heading={vi ? "Ý chính" : "Key points"}
            summary={vi ? "Giải thích đơn giản" : "Plain explanation"}
            keyPoints={vi
              ? [
                  "Thành phần ngang và thành phần thẳng đứng dùng cùng một thời gian đã trôi qua.",
                  "Khi bỏ qua lực cản không khí, gia tốc ngang bằng không và gia tốc thẳng đứng là gia tốc trọng trường.",
                ]
              : [
                  "Horizontal and vertical components use the same elapsed time.",
                  "With negligible air resistance, horizontal acceleration is zero and vertical acceleration is gravity.",
                ]}
          >
            <p>
              {vi
                ? "Một quỹ đạo cong có thể được phân tích thành hai chuyển động xảy ra đồng thời. Theo phương ngang, vận tốc không đổi. Theo phương thẳng đứng, trọng lực làm thay đổi vận tốc. Cùng một thời gian liên kết hai phép tính."
                : "One curved projectile path can be analysed as two motions happening together. Horizontally, velocity stays constant. Vertically, gravity changes velocity. The shared time connects the two calculations."}
            </p>
          </CognitiveSupport>
          <LectureHeading
            level={3}
            headingId="projectile-equations-title"
            points={[
              vi
                ? vietnameseKinematicsTranscriptPoints.projectileComponents
                : kinematicsTranscriptPoints.projectileComponents,
            ]}
            language={language}
          >
            {vi ? "Mô hình theo hai thành phần" : "Component model"}
          </LectureHeading>
          <AccessibleMathRegion labelledBy="projectile-equations-title">
            <math display="block">
              <mtable columnalign="left">
                <mtr>
                  <mtd><msub><mi>v</mi><mrow><mn>0</mn><mi>x</mi></mrow></msub><mo>=</mo><msub><mi>v</mi><mn>0</mn></msub><mi>cos</mi><mi>θ</mi></mtd>
                  <mtd><msub><mi>v</mi><mi>x</mi></msub><mo>=</mo><msub><mi>v</mi><mrow><mn>0</mn><mi>x</mi></mrow></msub><mo>=</mo><msub><mi>v</mi><mn>0</mn></msub><mi>cos</mi><mi>θ</mi><mo>=</mo><mtext>{vi ? "không đổi" : "constant"}</mtext></mtd>
                </mtr>
                <mtr>
                  <mtd><mi>Δx</mi><mo>=</mo><mo>(</mo><msub><mi>v</mi><mn>0</mn></msub><mi>cos</mi><mi>θ</mi><mo>)</mo><mi>t</mi></mtd>
                  <mtd><mtext>{vi ? "độ dời theo phương ngang" : "horizontal displacement"}</mtext></mtd>
                </mtr>
                <mtr>
                  <mtd><msub><mi>v</mi><mi>y</mi></msub><mo>=</mo><msub><mi>v</mi><mn>0</mn></msub><mi>sin</mi><mi>θ</mi><mo>−</mo><mi>g</mi><mi>t</mi></mtd>
                  <mtd><mtext>{vi ? "vận tốc theo phương thẳng đứng" : "vertical velocity"}</mtext></mtd>
                </mtr>
                <mtr>
                  <mtd><mi>Δy</mi><mo>=</mo><mo>(</mo><msub><mi>v</mi><mn>0</mn></msub><mi>sin</mi><mi>θ</mi><mo>)</mo><mi>t</mi><mo>−</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>g</mi><msup><mi>t</mi><mn>2</mn></msup></mtd>
                  <mtd><mtext>{vi ? "độ dời theo phương thẳng đứng" : "vertical displacement"}</mtext></mtd>
                </mtr>
                <mtr>
                  <mtd><msubsup><mi>v</mi><mi>y</mi><mn>2</mn></msubsup><mo>=</mo><msup><mrow><mo>(</mo><msub><mi>v</mi><mn>0</mn></msub><mi>sin</mi><mi>θ</mi><mo>)</mo></mrow><mn>2</mn></msup><mo>−</mo><mn>2</mn><mi>g</mi><mi>Δy</mi></mtd>
                  <mtd><mtext>{vi ? "vận tốc thẳng đứng tính từ độ dời" : "vertical velocity from displacement"}</mtext></mtd>
                </mtr>
              </mtable>
            </math>
          </AccessibleMathRegion>
          <LectureHeading
            level={3}
            headingId="projectile-example-title"
            points={[
              vi
                ? vietnameseKinematicsTranscriptPoints.projectileExample
                : kinematicsTranscriptPoints.projectileExample,
            ]}
            language={language}
          >
            {vi
              ? "Ví dụ trong bài giảng: xe rời mép vực theo phương ngang"
              : "Lecture example: car leaving a horizontal cliff"}
          </LectureHeading>
          <p>
            {vi
              ? "Một tài xế đóng thế lái xe rời khỏi mép vực cao 10,0 mét với tốc độ 20,0 mét mỗi giây theo phương ngang. Xe chạm đất cách chân vực bao xa?"
              : "A stunt driver drives a car off a 10.0 metre high cliff at 20.0 metres per second in the horizontal direction. How far does the car land from the base of the cliff?"}
          </p>
          <ol aria-labelledby="projectile-example-title">
            <li>
              <strong>{vi ? "Xác định vectơ vận tốc ban đầu:" : "Identify the initial velocity vector:"}</strong>{" "}
              {vi ? "v₀ = [20, 0], nên v₀ₓ = 20,0 m/s và v₀ᵧ = 0." : "v₀ = [20, 0], so v₀x = 20.0 metres per second and v₀y = 0."}
            </li>
            <li>
              <strong>{vi ? "Xác định các giá trị đã biết:" : "Identify the known values:"}</strong>{" "}
              {vi ? "y₀ = 10,0 m và g = 9,81 m/s²." : "y₀ = 10.0 metres and g = 9.81 metres per second squared."}
            </li>
            <li>
              <strong>{vi ? "Tìm thời gian rơi:" : "Find the fall time:"}</strong>{" "}
              {vi ? "chọn mặt đất tại y = 0, nên 0 = 10,0 − ½ × 9,81 × t². Do đó t = 1,43 giây." : "set ground level to y = 0, so 0 = 10.0 - one-half × 9.81 × t squared. Therefore t = 1.43 seconds."}
            </li>
            <li>
              <strong>{vi ? "Dùng cùng thời gian để tìm khoảng cách ngang:" : "Find the horizontal distance using the same time:"}</strong>{" "}
              {vi ? "x(1,43) = 20,0 × 1,43 = 28,6 m." : "x(1.43) = 20.0 × 1.43 = 28.6 metres."}
            </li>
          </ol>
          <ProjectileCliffFigure language={language} />
      </section>

      <section id="relative-motion" aria-labelledby="relative-title">
        <LectureHeading
          level={2}
          headingId="relative-title"
          points={[vi ? vietnameseKinematicsTranscriptPoints.relativeIntroduction : kinematicsTranscriptPoints.relativeIntroduction]}
          language={language}
        >
          {t("Change reference frames", "Thay đổi hệ quy chiếu")}
        </LectureHeading>
        <p>
          {t(
            "A measured velocity depends on the observer's reference frame. For object C and frames A and B, the lecture gives the Galilean velocity transformation by first relating their position vectors.",
            "Vận tốc đo được phụ thuộc vào hệ quy chiếu của người quan sát. Với vật C và các hệ A, B, bài giảng xây dựng phép biến đổi vận tốc Galileo bằng cách liên hệ các vectơ vị trí trước.",
          )}
        </p>
        <CognitiveSupport
          sectionId="relative-motion"
          heading={t("Key points", "Ý chính")}
          summary={t("Plain explanation", "Giải thích đơn giản")}
          keyPoints={vi ? [
            "Các phép đo vị trí và vận tốc phụ thuộc vào hệ quy chiếu của người quan sát.",
            "Lấy đạo hàm quan hệ vectơ vị trí để thu được phép biến đổi vận tốc.",
          ] : [
            "Position and velocity measurements depend on the observer's reference frame.",
            "Differentiate the position-vector relationship to obtain the velocity transformation.",
          ]}
        >
          <p>
            {t(
              "Two observers can assign different velocities to the same object because the observers may also move relative to each other. The transformation equation converts a measurement from one frame to another.",
              "Hai người quan sát có thể đo được các vận tốc khác nhau cho cùng một vật vì chính họ cũng có thể chuyển động tương đối với nhau. Phương trình biến đổi chuyển phép đo từ hệ quy chiếu này sang hệ khác.",
            )}
          </p>
        </CognitiveSupport>
        <h3 id="relative-position-title">{t("Position-vector relationship", "Quan hệ vectơ vị trí")}</h3>
        <AccessibleMathRegion labelledBy="relative-position-title">
          <math display="block">
            <mrow>
              <msub><mover><mi>r</mi><mo>→</mo></mover><mrow><mi>C</mi><mi>B</mi></mrow></msub>
              <mo>=</mo>
              <msub><mover><mi>r</mi><mo>→</mo></mover><mrow><mi>C</mi><mi>A</mi></mrow></msub>
              <mo>+</mo>
              <msub><mover><mi>r</mi><mo>→</mo></mover><mrow><mi>A</mi><mi>B</mi></mrow></msub>
            </mrow>
          </math>
        </AccessibleMathRegion>
        <p>
          {t(
            "In the source diagram, A and B are coordinate-frame origins and C is the object. The vector from B to C equals the vector from A to C plus the vector from B to A. Differentiating this relationship with respect to time gives the velocity transformation.",
            "Trong sơ đồ nguồn, A và B là gốc của các hệ tọa độ, còn C là vật. Vectơ từ B đến C bằng vectơ từ A đến C cộng với vectơ từ B đến A. Lấy đạo hàm quan hệ này theo thời gian cho phép biến đổi vận tốc.",
          )}
        </p>
        <RelativeFrameFigure language={language} />
        <LectureHeading
          level={3}
          headingId="relative-equation-title"
          points={[vi ? vietnameseKinematicsTranscriptPoints.relativeTransformation : kinematicsTranscriptPoints.relativeTransformation]}
          language={language}
        >
          {t("Velocity transformation", "Phép biến đổi vận tốc")}
        </LectureHeading>
        <AccessibleMathRegion labelledBy="relative-equation-title">
          <math display="block">
            <mrow>
              <msub><mover><mi>v</mi><mo>→</mo></mover><mrow><mi>C</mi><mi>B</mi></mrow></msub>
              <mo>=</mo>
              <msub><mover><mi>v</mi><mo>→</mo></mover><mrow><mi>C</mi><mi>A</mi></mrow></msub>
              <mo>+</mo>
              <msub><mover><mi>v</mi><mo>→</mo></mover><mrow><mi>A</mi><mi>B</mi></mrow></msub>
            </mrow>
          </math>
        </AccessibleMathRegion>
        <p>
          {t(
            "In the lecture scenario, Amy measures Carlos at +5 metres per second, while Bill measures Carlos at -10 metres per second. Bill therefore moves at +15 metres per second relative to Amy.",
            "Trong tình huống của bài giảng, Amy đo vận tốc của Carlos là +5 m/s, còn Bill đo vận tốc của Carlos là −10 m/s. Vì vậy Bill chuyển động với vận tốc +15 m/s so với Amy.",
          )}
        </p>
      </section>

      <section id="learning-support" aria-labelledby="learning-support-title">
        <LectureHeading
          level={2}
          headingId="learning-support-title"
          points={[vi ? vietnameseKinematicsTranscriptPoints.learningSupportTransition : kinematicsTranscriptPoints.learningSupportTransition]}
          language={language}
        >
          {t("Learning support noted in the lecture", "Hỗ trợ học tập được nhắc trong bài giảng")}
        </LectureHeading>
        <p>{t("The final annotated page directs students to these RMIT study supports:", "Trang chú thích cuối cùng hướng sinh viên đến các dịch vụ hỗ trợ học tập sau của RMIT:")}</p>
        <p>
          {t(
            "This provisional range includes the classroom transition into the support presentation and short Vietnamese speech. Language boundaries, speaker identities, and wording require teacher review.",
            "Khoảng thời gian tạm xác định này bao gồm phần chuyển tiếp trong lớp sang nội dung hỗ trợ và một đoạn nói tiếng Việt ngắn. Ranh giới ngôn ngữ, danh tính người nói và câu chữ cần được giảng viên kiểm tra.",
          )}
        </p>
        <LectureHeading
          level={3}
          headingId="learning-support-services-title"
          points={[vi ? vietnameseKinematicsTranscriptPoints.learningSupportServices : kinematicsTranscriptPoints.learningSupportServices]}
          language={language}
        >
          {t("Student Academic Success services", "Các dịch vụ Student Academic Success")}
        </LectureHeading>
        <ul>
          <li>{t("The Learning Advising Team within Student Academic Success (SAS).", "Nhóm Tư vấn Học tập thuộc Student Academic Success (SAS).")}</li>
          <li>{t("Peter Moore and Josh Reed for writing support.", "Peter Moore và Josh Reed hỗ trợ kỹ năng viết.")}</li>
          <li>{t("The SAS website, with the handwritten references “1.4.36 learning advisors” and “2.4.40 engineering tutors.”", "Trang web SAS, với các ghi chú viết tay “1.4.36 learning advisors” và “2.4.40 engineering tutors”.")}</li>
          <li>{t("The Learning Lab for writing and mathematics learning support.", "Learning Lab hỗ trợ học tập về viết và toán.")}</li>
        </ul>
        <p>
          {t("The handwritten source gives the address", "Nguồn viết tay cung cấp địa chỉ")} <strong>sas.rmit.edu.vn</strong>.
          {" "}{t("Availability and current contact details should be checked with RMIT.", "Cần kiểm tra với RMIT về tình trạng hoạt động và thông tin liên hệ hiện tại.")}
        </p>
      </section>

    </AccessibleLessonShell>
  );
}
