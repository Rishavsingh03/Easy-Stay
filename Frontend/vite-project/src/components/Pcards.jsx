import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Pcards(data) {
    let {title,description,price,location,country,_id,image} = data;
    price=price.toLocaleString("en-IN");
    const navigate=useNavigate();
  return (
    <div className='hover:opacity-80 w-3/4 sm:w-auto'>
      <Link to={`/Listings/${_id}`} className='no-underline'>
      <Card style={{width:'100%', maxwidth: '20rem' ,border:"0"}}>
      <Card.Img variant="top" src={image.url} style={{ height:'15rem',maxheight:'20rem',objectFit:"cover", borderRadius:"0.5rem"}} />
      <Card.Body style={{marginTop:"-0.5rem"}}>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{marginTop:"-0.5rem"}}>
        &#8377;{price} /night
        </Card.Text>
      </Card.Body>
     </Card>
     </Link>
    </div>
    
    
  );
}

export default Pcards;