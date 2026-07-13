/* global React, TopBar, ChipRow, Post, SectionHeading, SpotlightCard, Icon */
// Feed screen

const FeedScreen = () => {
  const [filter, setFilter] = React.useState('For you');
  return (
    <div className="ss-screen">
      <TopBar />
      <ChipRow items={['For you', 'Travel', 'Housing', 'Mentorship', 'Wellness']}
        active={filter} onChange={setFilter} />

      <SectionHeading title="Today's spotlight" more="" />
      <Post
        eyebrow="SPOTLIGHT"
        headline="Your way and the highway."
        cover="lav"
        byline="@kevin.the.nurse · 2h"
        body="Fourteen states in three years. Kevin shares his packing list, favorite agencies, and the one thing he never travels without."
      />

      <SectionHeading title="Meet your community" more="see all" />
      <div className="ss-spotrow">
        <SpotlightCard name="Kiara Stone" role="occupational therapist" img="lav" />
        <SpotlightCard name="Lin Nguyen" role="travel rn · 6 yrs" img="" />
        <SpotlightCard name="Jordan Reed" role="icu float · austin" img="dew" />
        <SpotlightCard name="Ava Chen" role="peds · dallas" img="lav" />
      </div>

      <SectionHeading title="Because we've been there.." />
      <Post
        eyebrow="RESOURCES"
        headline="5 must-know tips for evaluating a job offer."
        cover="dew"
        byline="scrub society editorial"
        body="Before you sign, run through this checklist. Pay is only half the picture — here's how to read contracts the way a seasoned traveler would."
      />
      <Post
        eyebrow="COMMUNITY"
        headline="Happy nursiversary!"
        cover="plum"
        byline="@lin.travels · 1d"
        body="Seven years on the road. Grateful for every hospital, every roommate, every assignment that shaped the nurse I am today."
      />

      <div style={{ height: 12 }} />
    </div>
  );
};

window.FeedScreen = FeedScreen;
