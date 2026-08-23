import Link from "next/link";

export default function News184Page() {
  return (
    <main className="news-detail-page" dir="rtl">

      {/* HERO */}
      <section className="news-detail-hero">
        <div className="container">

          <Link href="/" className="news-back" dir="ltr">
            ← Retour à l’accueil
          </Link>

          <div className="news-detail-meta">
            <span>ACTUALITÉ</span>
            <span>SRM GUELMIM — OUED NOUN</span>
          </div>

          <h1>
            انعقاد اجتماع المجلس الاداري للشركة الجهوية متعددة الخدمات
            كلميم – واد نون
          </h1>

          <p className="news-detail-intro">
            اجتماع المجلس الإداري للشركة الجهوية متعددة الخدمات كلميم – واد نون.
          </p>

        </div>
      </section>


      {/* ARTICLE */}
      <section className="news-detail-content">

        <div className="container news-detail-layout">

          <article className="news-article">

            <div className="news-article-image">
              <img
                src="/news-184.jpg"
                alt="انعقاد اجتماع المجلس الاداري للشركة الجهوية متعددة الخدمات كلميم – واد نون"
              />
            </div>


            <div className="news-article-body">

              <p>
                عملاً بمقتضيات القانون 83-21 المتعلق بإحداث الشركات الجهوية
                متعددة الخدمات، انعقد اجتماع المجلس الإداري للشركة الجهوية
                متعددة الخدمات كلميم – واد نون.
              </p>

              <p>
                ويعد هذا اللقاء محطة بارزة في مسار تفعيل ورش الجهوية المتقدمة
                وإصلاح قطاع توزيع الماء والكهرباء والتطهير السائل، من خلال
                إحداث فاعل جهوي عصري وفعال، يضمن تدبيرًا متكاملًا وقريبًا من
                المواطن، ويرسخ مبادئ العدالة المجالية.
              </p>

              <p>
                وتهدف الشركة الجهوية متعددة الخدمات كلميم – واد نون إلى ضمان
                خدمة عمومية ذات جودة عالية ومستدامة، عبر اعتماد حكامة حديثة
                وشفافة تستجيب للحاجيات المتزايدة للساكنة. كما تعتزم الشركة،
                في أفق 30 سنة، تنفيذ برنامج استثماري طموح يناهز 2.7 مليار درهم،
                موجه لتقوية وتحديث البنيات التحتية، ومواكبة النمو الديمغرافي
                والاقتصادي، وكذا الحفاظ على الموارد الطبيعية بالجهة.
              </p>

              <p>
                ومن خلال هذا المشروع المهيكل، تترجم الشركة تعبئة الدولة
                والجماعات الترابية من أجل تمكين المواطن من خدمات أساسية
                فعالة، والمساهمة في دعم الدينامية التنموية وتعزيز جاذبية
                جهة كلميم – واد نون.
              </p>

              <p>
                كما تهدف الشركة إلى توفير خدمات عصرية ومستدامة لفائدة الساكنة
                والمستثمرين، بما يعزز جاذبية الجهة ويواكب التحولات التنموية
                الكبرى التي تعرفها الجهة. وتتعهد الشركة الجهوية متعددة الخدمات،
                عبر تأمين البنيات التحتية الأساسية اللازمة، بمواكبة الأوراش
                الاستراتيجية ذات البعد الوطني والقاري وكذا التنمية الاقتصادية،
                العمرانية والسياحية للجهة، وذلك في إطار رؤية شمولية تجعل من
                هذه الجهة قطبًا اقتصاديًا متكاملاً وواعدًا على المستويين الوطني
                والإفريقي.
              </p>

            </div>

          </article>


          {/* SIDEBAR */}
          <aside className="news-sidebar" dir="ltr">

            <div className="news-sidebar-card dark">

              <span>SRM GUELMIM — OUED NOUN</span>

              <h3>
                L’eau.
                <br />
                L’énergie.
                <br />
                <strong>La vie.</strong>
              </h3>

            </div>


            <div className="news-sidebar-card">

              <span>CONTACT</span>

              <strong>0800002026</strong>

              <a href="tel:0800002026" className="sidebar-action">
                <span className="sidebar-action-icon">
                    <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    >
                    <path
                        d="M6.6 2.5 4.8 3.9c-.8.6-1.1 1.7-.7 2.6
                        2.2 5.5 6.1 9.4 11.6 11.6.9.4 2 .1 2.6-.7l1.4-1.8
                        c.5-.7.4-1.7-.2-2.3l-2.8-2.2c-.6-.5-1.5-.4-2 .1l-1
                        1c-2.1-1-3.8-2.7-4.8-4.8l1-1c.5-.5.6-1.4.1-2L8.9
                        2.7c-.6-.6-1.6-.7-2.3-.2Z"
                    />
                    </svg>
                </span>

                <span>Appeler maintenant</span>

                <span className="sidebar-action-arrow">→</span>
                </a>

            </div>


            <div className="news-sidebar-card">

              <span>EMAIL</span>

              <strong>contact@srm-go.ma</strong>

              <a
                href="mailto:contact@srm-go.ma"
                className="sidebar-action"
                >
                <span className="sidebar-action-icon">
                    <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    >
                    <path
                        d="M3.5 6.5h17v11h-17z"
                    />
                    <path
                        d="m4 7 8 6 8-6"
                    />
                    </svg>
                </span>

                <span>Nous écrire</span>

                <span className="sidebar-action-arrow">→</span>
                </a>

            </div>


            <Link href="/" className="news-sidebar-back">
              ← Retour aux actualités
            </Link>

          </aside>

        </div>

      </section>

    </main>
  );
}