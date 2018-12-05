import React from "react";
import { capitalize, locLang } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import Tray from "../../../Tray";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const SeamAllowanceOption = props => {
  return (
    <div>
      <FormControl component="fieldset" className="ml1">
        <RadioGroup
          aria-label="Gender"
          name="gender1"
          value={props.value}
          onChange={props.handleChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SeamAllowanceOption;
