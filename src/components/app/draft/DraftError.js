<Tray
  className="danger"
  title={<FormattedMessage id="app.weEncounteredAProblem" />}
>
  <p>
    <FormattedMessage id="app.weEncourageYouToReportThis" />
    {". "}
    <FormattedMessage id="app.pleaseIncludeTheInformationBelow" />
    {":"}
  </p>
  <pre>
    Error: {this.state.error}
    {"\n\n"}
    Pattern: {this.props.pattern}
    {"\n\n"}
    Settings: {JSON.stringify(this.state.settings, null, 2)}
  </pre>
  <TrayFooter>
    <Button
      variant="outlined"
      color="primary"
      href="https://github.com/freesewing/website/issues/new"
      rel="noopener noreferral"
    >
      <GithubIcon className="mr1" />
      <FormattedMessage id="app.reportThisOnGitHub" />
    </Button>
  </TrayFooter>
</Tray>;
