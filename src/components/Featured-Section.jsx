import { useFirebase } from '../contexts/FirebaseContext';
import FeatureCard from './Cards/Feature-Card';

const FeaturedSection = () => {
  const data = useFirebase();
  const featuredData = data?.AllFeatureData;
  return (
    <section className="normal-page flex flex-col gap-14">
      <h2 className="text-3xl font-bold uppercase">Featured</h2>
      <div className="w-full flex gap-10">
        {featuredData?.map((data, index) => (
          <FeatureCard key={index} feature={data} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
