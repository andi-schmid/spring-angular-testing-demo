package org.addressbook.domain;

import org.addressbook.infrastructure.PersonRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

import static java.util.Collections.singletonList;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

@SuppressWarnings("Duplicates")
public class PersonDomainServiceTest {

    @Mock
    private PersonRepository personRepository;

    private PersonDomainService personDomainService;

    private Person defaultPerson;

    @Before
    public void setUp() {

        initMocks(this);

        personDomainService = new PersonDomainService(personRepository);

        defaultPerson = new Person();
        defaultPerson.setId(5);
        defaultPerson.setVersion(0);
        defaultPerson.setFirstname("Felix");
        defaultPerson.setLastname("Meier");
        defaultPerson.setStreet("Effingerstrasse 3");
        defaultPerson.setZip("3000");
        defaultPerson.setCity("Bern");
        defaultPerson.setPhone("+ 41 111 11 11");
    }

    @Test
    public void findByPersonId() {


        when(personRepository.findById(defaultPerson.getId())).thenReturn(Optional.of(defaultPerson));

        Person resultPerson = personDomainService.findByPersonId(defaultPerson.getId());

        assertNotNull(resultPerson);
        assertEquals(defaultPerson.getId(), resultPerson.getId());
        assertEquals(defaultPerson.getVersion(), resultPerson.getVersion());
        assertEquals(defaultPerson.getFirstname(), resultPerson.getFirstname());
        assertEquals(defaultPerson.getLastname(), resultPerson.getLastname());
        assertEquals(defaultPerson.getStreet(), resultPerson.getStreet());
        assertEquals(defaultPerson.getZip(), resultPerson.getZip());
        assertEquals(defaultPerson.getCity(), resultPerson.getCity());
        assertEquals(defaultPerson.getPhone(), resultPerson.getPhone());
    }

    @Test(expected = EntityNotFoundException.class)
    public void findByPersonIdNoPersonFound() {

        when(personRepository.findById(any())).thenReturn(Optional.empty());
        personDomainService.findByPersonId(5);
    }

    @Test
    public void findAdressesByFirstName() {

        when(personRepository.findByFirstname(defaultPerson.getFirstname())).thenReturn(singletonList(defaultPerson));

        List<Person> resultPersons = personDomainService.findAdressesByName(defaultPerson.getFirstname(), null);

        assertThat(resultPersons, hasSize(1));

        Person resultPerson = resultPersons.get(0);

        assertThat(resultPerson.getId(), is(defaultPerson.getId()));
        assertThat(resultPerson.getVersion(), is(defaultPerson.getVersion()));
        assertThat(resultPerson.getFirstname(), is(defaultPerson.getFirstname()));
        assertThat(resultPerson.getLastname(), is(defaultPerson.getLastname()));
        assertThat(resultPerson.getStreet(), is(defaultPerson.getStreet()));
        assertThat(resultPerson.getZip(), is(defaultPerson.getZip()));
        assertThat(resultPerson.getCity(), is(defaultPerson.getCity()));
        assertThat(resultPerson.getPhone(), is(defaultPerson.getPhone()));
    }

    @Test
    public void findAdressesByLastname() {

        when(personRepository.findByLastname(defaultPerson.getLastname())).thenReturn(singletonList(defaultPerson));

        List<Person> resultPersons = personDomainService.findAdressesByName(null, defaultPerson.getLastname());

        assertThat(resultPersons, hasSize(1));

        Person resultPerson = resultPersons.get(0);

        assertThat(resultPerson.getId(), is(defaultPerson.getId()));
        assertThat(resultPerson.getVersion(), is(defaultPerson.getVersion()));
        assertThat(resultPerson.getFirstname(), is(defaultPerson.getFirstname()));
        assertThat(resultPerson.getLastname(), is(defaultPerson.getLastname()));
        assertThat(resultPerson.getStreet(), is(defaultPerson.getStreet()));
        assertThat(resultPerson.getZip(), is(defaultPerson.getZip()));
        assertThat(resultPerson.getCity(), is(defaultPerson.getCity()));
        assertThat(resultPerson.getPhone(), is(defaultPerson.getPhone()));
    }

    @Test
    public void findAdressesByFirstAndLastname() {

        when(personRepository
                .findByFirstnameAndLastname(defaultPerson.getFirstname(), defaultPerson.getLastname()))
                .thenReturn(singletonList(defaultPerson));

        List<Person> resultPersons =
                personDomainService.findAdressesByName(defaultPerson.getFirstname(), defaultPerson.getLastname());

        assertThat(resultPersons, hasSize(1));

        Person resultPerson = resultPersons.get(0);

        assertThat(resultPerson.getId(), is(defaultPerson.getId()));
        assertThat(resultPerson.getVersion(), is(defaultPerson.getVersion()));
        assertThat(resultPerson.getFirstname(), is(defaultPerson.getFirstname()));
        assertThat(resultPerson.getLastname(), is(defaultPerson.getLastname()));
        assertThat(resultPerson.getStreet(), is(defaultPerson.getStreet()));
        assertThat(resultPerson.getZip(), is(defaultPerson.getZip()));
        assertThat(resultPerson.getCity(), is(defaultPerson.getCity()));
        assertThat(resultPerson.getPhone(), is(defaultPerson.getPhone()));
    }
}