import './heroSection.css';
import browseSelectionIcon from "../../assets/browseSelectionIcon.svg";
import becomeOurWinerIcon from "../../assets/becomeOurWinerIcon.svg";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="hero-section">
                <div className="hero-text">
                    <h1>Welcome to Our Winery</h1>
                    <p><strong>Discover the taste of tradition</strong></p>
                </div>
                <div className="hero-buttons">
                    <div className="hero-button-container">
                        <strong>Become our winer</strong>
                        <div onClick={() => navigate("/auth/register")} className="hero-button">
                            <img src={becomeOurWinerIcon} />
                        </div>
                    </div>
                    <div className="hero-button-container">
                        <strong>Browse collection</strong>
                        <div onClick={() => navigate("/wines")} className="hero-button">
                            <img src={browseSelectionIcon} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
