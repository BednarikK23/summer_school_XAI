import "./homePage.css";
import HeroSection from "../../components/heroSection/heroSection.tsx";
import ExpandableTextField from "../../components/expendableTextField/ExpendableTextField.tsx";

const HomePage = () => {
    return (
        <div className="home-page">
            <HeroSection />

            <div className="home-page__expandable">
                <ExpandableTextField
                    title="About Us"
                    content="We are a group of people that want to make smaller talented winers more visible and their product more available. We provide services such as product showcasing, marketing, and sales support to help winers reach a broader audience. Our mission is to celebrate the art of winemaking and bring exceptional wines to enthusiasts everywhere."
                />

                <ExpandableTextField
                    title="More Info"
                    content="Our services include direct integration with e-commerce platforms, personalized marketing strategies, and a dedicated support team to ensure the success of our winers. We also offer exclusive tasting events, educational workshops, and a community of like-minded wine lovers."
                />

                <ExpandableTextField
                    title="Contact us"
                    content={`You can reach us through any of the following options:\n\n\tSocial media: listed bellow\n\tPhone: +420 770 676 994\n\tEmail: winery-page@email.com\n\nWe look forward to hearing from you!`}
                />
            </div>
        </div>
    );
};

export default HomePage;
