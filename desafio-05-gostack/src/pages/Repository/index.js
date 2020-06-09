import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container/index';
import {
  Loading,
  Owner,
  IssueList,
  Div,
  ButtonOpen,
  ButtonClosed,
  ButtonAll,
  DivPage,
} from './styles';

export default class Repository extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { state: 'all', label: 'Todas', active: true },
      { state: 'open', label: 'Abertas', active: false },
      { state: 'closed', label: 'Fechadas', active: false },
    ],
    filterId: 0,
    page: 1,
  };

  async componentDidMount(e) {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const repository = await api.get(`/repos/${repoName}`);

    if (e === 'all') {
      const issues = await api.get(`/repos/${repoName}/issues?state=all`, {
        params: {
          per_page: 10,
        },
      });
      this.setState({ issues: issues.data });
    } else if (e === 'open') {
      const issues = await api.get(`/repos/${repoName}/issues?state=open`, {
        params: {
          per_page: 5,
        },
      });
      this.setState({ issues: issues.data });
    } else if (e === 'closed') {
      const issues = await api.get(`/repos/${repoName}/issues?state=closed`, {
        params: {
          per_page: 5,
        },
      });
      this.setState({ issues: issues.data });
    } else {
      const issues = await api.get(`/repos/${repoName}/issues?state=all`, {
        params: {
          per_page: 5,
        },
      });

      this.setState({
        repository: repository.data,
        issues: issues.data,
        loading: false,
      });
    }
  }

  buttonOpen = async (e) => {
    this.componentDidMount(e.target.value);
  };

  pagesNavigation = async () => {
    const { match } = this.props;
    const { filters, filterId, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const res = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterId].state,
        per_page: 5,
        page,
      },
    });
    this.setState({ issues: res.data });
  };

  buttonPage = async (e) => {
    const { page } = this.state;

    await this.setState({
      page: e === 'voltar' ? page - 1 : page + 1,
    });
    this.pagesNavigation();
  };

  render() {
    const { repository, issues, loading, page } = this.state;
    console.log(repository);

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Div>
          <ButtonOpen onClick={this.buttonOpen} value="open">
            Abertos
          </ButtonOpen>
          <ButtonClosed onClick={this.buttonOpen} value="closed">
            Fechados
          </ButtonClosed>
          <ButtonAll onClick={this.buttonOpen} value="all">
            Todos
          </ButtonAll>
        </Div>

        <IssueList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                  <span>{issue.state}</span>
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <DivPage>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.buttonPage('voltar')}
          >
            Anterior
          </button>
          <button type="button" onClick={() => this.buttonPage('ir')}>
            Próxima
          </button>
        </DivPage>
      </Container>
    );
  }
}
