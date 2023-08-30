import 'bootstrap/dist/css/bootstrap.min.css';
import s1 from '../../assets/Services1.jpg'
import s2 from '../../assets/services2.jpg'
import s3 from '../../assets/services3.jpg'
import s4 from '../../assets/services4.jpg'
import s5 from '../../assets/services5.jpg'
import s6 from '../../assets/services6.jpg'
import s7 from '../../assets/services7.jpg'
import l1 from '../../assets/icons/regular-laundry.png'
import l2 from '../../assets/icons/dry-cleaning.png'
import l3 from '../../assets/icons/steam-pressing.png'
import logo4 from '../../assets/icons/carpet-cleaning.png'
import logo5 from '../../assets/icons/curtain-cleaning.png'
import l6 from '../../assets/icons/sofa-cleaning.png'
import l7 from '../../assets/icons/specialized-items.png'
import './service.css'

function Services() {
    return (
        <>
        <div className='container'>
            <div className='row eachRow'>
                <div className='col-md-4  text-center'>
                    <img src={l1} className='p-2'></img>
                    <h5 className='text-info'>Services</h5>
                    <img src={s1}></img>
                    <p>The brightest color - ultra white. It's more than washing</p>
                    <p>.It is the care of the laundry</p>
                    <p>Because it's not just clean when it looks clean</p>
                    <p>It also makes you feel clean</p>
                </div>
                <div className='col-md-4 text-center'>
                    <img src={l2} className='p-2'></img>
                    <h5 className='text-info'>Dry Cleaning</h5>
                    <img src={s2}></img>
                    <p>Preserving the beauty and age of your favorite clothes</p>
                    <p>Return clothes to 'like new' condition</p>
                    <p>Without shrinkage, color loss</p>
                    
                </div>
                <div className='col-md-4 text-center'>
                    <img src={l3} className='p-2'></img>
                    <h5 className='text-info'>Steam Ironing</h5>
                    <img src={s3}></img>
                    <p>Look at “work” in ironed shirts and trousers</p>
                    <p>meticulously and meticulously. You'll find it worth a little effort</p>
                    <p>To get high quality service without any compromises</p>
                    
                    
                </div>
            </div>
            <div className='row eachRow'>
                <div className='col-md-4 text-center'>
                    <img src={logo4} className='p-2'></img>
                    <h5 className='text-info'>Carpet cleaning</h5>
                    <img src={s4}></img>
                    <p>Carpets are cleaned professionally, with utmost care and efficiency</p>
                    <p>You deserve it in your home. Care in preparation</p>
                    
                    
                </div>
                <div className='col-md-4 text-center'>
                    <img src={logo5} className='p-2'></img>
                    <h5 className='text-info'>Blinds cleaning</h5>
                    <img src={s5}></img>
                    <p>A mobile team of experts equipped with training and tools</p>
                    <p>.necessary to get the job done right the first time</p>
                    <p></p>
                    
                </div>
                <div className='col-md-4 text-center'>
                    <img src={l6} className='p-2'></img>
                    <h5 className='text-info'>Sofa,sheets,blankets</h5>
                    <img src={s6}></img>
                    <p>We go the extra mile to make sure that your living space is not only clean but hygienic.</p>
                    <p>Yours is not just clean, it's squeaky clean</p>
                    
                    
                </div>
            </div>
            <div className='row eachRow'>
                <div className='col-md-4 text-center'>
                    <img src={l7} className='p-2'></img>
                    <h5 className='text-info'>Specialized items</h5>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <img src={s7}></img>
                    <p>We're checking clothing labels</p>
                    <p>.while ensuring that specialized items are treated with care</p>
                    <p>We can also handle larger items</p>
                    <p>.such as sheets and blankets</p>
                </div>
                
            </div>
        </div>
        </>
    );
}

export default Services;