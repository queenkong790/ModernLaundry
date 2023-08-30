import home1 from '../../assets/home1.jpg'
import './home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import serv from '../../assets/services.jpg'
import home3 from '../../assets/home3.jpg'
import home4 from '../../assets/home4.jpg'
import {Link,NavLink} from 'react-router-dom'
import home5 from '../../assets/home5.jpg'
import ios from '../../assets/ios-icon.png' 
import gplay from '../../assets/gplay-icon.png'
import hilton from '../../assets/hilton.jpg'
import marriot from '../../assets/marriot.jpg'
import holidayinn from '../../assets/holiday-inn.jpg'
import hyatt from '../../assets/hyatt.jpg'
import logo1 from '../../assets/icons/regular-laundry.png'
import logo2 from '../../assets/icons/steam-pressing.png'
import logo3 from '../../assets/icons/curtain-cleaning.png'
import logo4 from '../../assets/icons/specialized-items.png'
import classes from '../BookNowPages/Signup.module.css'




function Home () {
    
    return (
        <>
        <img src={home1} className="img1" / >
        <div className= "container service ">
            <div className='row '  > 
            <div className=' col-md-6'>
            <h2 style={{color:'grey'}} >Services</h2>
                <br/>
                <div className='serviceTypes container-fluid'>
                    <div><img src={logo1} width={50}></img></div>
                    <div><h4 className='text-info'>Laundry</h4></div>
                </div>
                
                <p>The brightest colours - the whitest whites. It’s more than the wash, it’s about care, because it’s not just clean when it looks clean, it needs to feel clean too.</p>
                <br/>
                <div className='serviceTypes container-fluid'>
                    <div><img src={logo2} width={50}></img></div>
                    <div><h4 className='text-info'>Steam Ironing</h4></div>
                </div>
                <p>Look ‘the business’ with professionally pressed shirts and trousers. You’ll find its well-worth a little extra for a complete quality service without compromise.</p>
                <br/>
                <div className='serviceTypes container-fluid'>
                    <div><img src={logo3} width={50}></img></div>
                    <div><h4 className='text-info'>Dry laundry</h4></div>
                </div>
                <p>Maintain the beauty and lifespan of your favourite clothes. Return clothes to a ‘like-new’ condition without shrinkage, loss of colour, or texture changes.</p>
                <br/>
                <div className='serviceTypes container-fluid'>
                    <div><img src={logo4} width={50}></img></div>
                    <div><h4 className='text-info'>Special Purpose</h4></div>
                </div>
                <p>We check the labels of the clothes, ensuring specialized items are treated with care. We’re also able to handle larger items like sheets and blankets.</p>
                <div className='btnparent'>
                    <a role='button' href='/Services'  className="btn" >view More Services</a> <a role='button' href='/Corporate'  className='btn'>Corporate Inquiries</a> 
                </div>
            </div>
            <div className=' col-md-6'>
                <img src={serv} className='serviceimg' ></img>
            </div>
            </div>
            <div className='row my-5'  > 
                <div className='col-md-6'>
                    <img src={home3} className='serviceimg' ></img>
                </div>
                <div className='col-md-6'>
                    <h2 style={{color:'grey'}} >Loyalty program</h2>
                    <br/>
                    <h4 className='text-info'>You have found the perfect
                                                laundry service. What is next?</h4>
                    
                    <p>Join our rewards program today, and get
                                more wash for your cash.</p>
                    <br/>
                    
                    <p>Simply register an account and see your savings
                                grow with every new order</p>
                    <br/>
                    <a role='button' href='/BookNow'  className='btn btn-outline-info'>Register</a> 
                </div>
            
            </div>
            <div className='row my-5'  > 
                
                <div className='col-md-6'>
                    <h2 style={{color:'grey'}} >Why choose us</h2>
                    <br/>
                    <p>At Modern Laundry we know that success comes from satisfied customers! That is why we will make sure your first Modern Laundry experience is excellent, and strive to reward our loyal customers with the very best laundry service every time. How do we do that? Uncompromising standards!</p>
                    <h4 className='text-info'>Flexible to your schedule fanatical about ours.</h4>
                    
                    <p>Our pick-up and delivery promises you can organize your life knowing that if you dont have the time for laundry, you certainly dont have time to waste.</p>
                    <br/>
                    <h4 className='text-info'> Customers have come first.</h4>
                    <p>We take pride in being the friendliest, most efficient laundry service in the business, seeing every load, big or small, as a chance to make a customer happy.</p>
                    <br/>
                    <a role='button' href='/BookNow'  className='btn btn-outline-info'>SignUp</a> 
                </div>
                <div className='col-md-6'>
                    <img src={home4} className='serviceimg' ></img>
                </div>
            </div>
            <div className='row my-5'  > 
                
                <div className='col-md-6'>
                    <h2 style={{color:'grey'}} >Download the app</h2>
                    <br/>
                    <p>No more boring ordering with the app that stores the chore for you. Plan your pick-up or delivery whenever you get a minute, on-the-go or on your couch. In-app features let you track your wash load progress, view your points, update locations and get first word of exciting specials & exclusive offers.</p>
                    <br/>
                    
                </div>
                <div className='col-md-6'>
                    <img src={home5} className='serviceimg' width='500' ></img>
                </div>
            </div>
            <div className=' d-flex justify-content-center'>
                <div className=' '><img src={ios}></img></div>
                <div className=' '><img src={gplay}></img></div>
                
            </div>
            <h2 className='text-center p-4 m-4'>Trusted By <br/> Millions Of Returning Happy Customers</h2>
            
        </div>
        
        </>
    );
}

export default Home;