import { useTitle } from "@/utils/hooks";
import { siteTitle } from "@/utils/constant";
import { useEffect, useState } from "react";

import PageTitle from "components/PageTitle";
import Section from "./childComps/Section";
import Aside from "./childComps/Aside";
import s from "./index.module.styl";

interface Props {
  setNavShow?: Function;
}
const Home: React.FC<Props> = () => {
  useTitle(siteTitle);

  const [poem, setPoem] = useState("");
  useEffect(() => {
    (async () => {
      const rawresponse = await fetch("https://v1.hitokoto.cn"); //自带的fetch
      const response = await rawresponse.json();
      setPoem(response.hitokoto);
    })();
  }, []);

  return (
    <>
      <PageTitle
        title={siteTitle}
        desc={poem}
        className={s.pageTitle}
      ></PageTitle>
      <div className={s.home}>
        <Section className={s.section} />
        <Aside className={s.aside} />
      </div>
    </>
  );
};

export default Home;
