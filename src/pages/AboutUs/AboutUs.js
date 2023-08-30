
import About1 from '../../assets/about1.png'
import About2 from '../../assets/about2.png'
import About3 from '../../assets/about3.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutUs.css'


function AboutUs() {
    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className='col-12 col-md-6'>
                    <h2 className='text-info '>Since</h2>
                    <h1 className='text-info head' >1973</h1>
                    <br/>
                    
                    
                    <p>We are a leading laundry company with over 200 employees nationally and considered to be one of the biggest and most prestigious laundromats in the Emirates.</p>
                    <br/>
                    
                    <p>Modern Laundry has been a leading national firm, backed by modern facilities and unrivaled support, for more than 35 years now.</p>
                    <br/>
                    
                </div>
                <div className='col-12 col-md-6'>
                    <img src={About1} className='serviceimg' ></img>
                </div>
                <div className='col-12 col-md-6'>
                    <img src={About2} className='serviceimg' ></img>
                </div>
                <div className='col-12 col-md-6'>
                    <h1 className='text-info' >20+</h1>
                    <h2 className='text-info head'>outlets</h2>
                    
                    <br/>
                    
                    
                    <p>We are a leading laundry company with over 200 employees nationally and considered to be one of the biggest and most prestigious laundromats in the Emirates.</p>
                    <br/>
                    
                    <p>Modern Laundry has been a leading national firm, backed by modern facilities and unrivaled support, for more than 35 years now.</p>
                    <br/>
                    
                </div>
                
                <div className='col-12 col-md-6'>
                    <h2 className='text-info' >Focused</h2>
                    
                    
                    <br/>
                    
                    
                    <p>We take pride in being the friendliest, most efficient laundry service in the business, seeing every load, big or small, as a chance to make a customer happy. Our experienced staff are highly trained experts in fabric care and cleaning. We use modern methods and state-of-the-art machines to ensure the perfect wash</p>
                    <br/>
                    
                    
                    <br/>
                    
                </div>
                <div className='col-12 col-md-6'>
                    <img src={About3} className='serviceimg' ></img>
                </div>
                </div>
        </div>
        </>
    );
}

export default AboutUs;