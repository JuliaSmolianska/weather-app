import { DNA } from "react-loader-spinner";
import Col from 'react-bootstrap/Col';

const Loader = () => {
  return (
    <Col className="d-flex justify-content-center">
      <DNA
        visible={true}
        height="150"
        width="300"
        margin="auto"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </Col>
  );
};
export default Loader;
